<?php

// echo preg_replace_callback("/\d+/",function($e){
//   return floatval($e) / 100;
// },"safas123/asdf");
// die();
include_once "html_loader.php";
$json = wxa::getInstance(__DIR__);
$json->getPage();

class wxa
{
    private static $wxa;
    private $path;
    private $import = [];
    private function __construct($path)
    {
        $this->path = $path;
    }

    public static function getInstance($path)
    {
        if (!self::$wxa) {
            self::$wxa = new wxa($path);
        }
        return self::$wxa;
    }

    public function getPage()
    {
        $app = $this->readJson("/app.json");
        $import = "";
        $childer = "";

        foreach ($app["pages"] as $k => $v) {
            $name = str_replace('/', "_", $v);
            if (!isset($entry)) {
                $entry = $name;
                $entryPath = '/' . $v;
            }
            $import .= "import " . $name . " from '@/" . $v . ".vue'; \r\n";
            $childer .= <<<EOT
            {
                path: '/{$v}',
                name: '{$name}',
                component: {$name}
            },\r\n
EOT;

            $v = "/" . $v;
            $path = $this->getPath($v);
            $wxml = $this->transfromWxml($this->getFile($v . ".wxml"));
            $json = $this->getFile($v . ".json");
            $wxss = $this->transformWxss($this->getFile($v . ".wxss"), $v);
            $js = $this->transformJs($this->getFile($v . ".js"));
            $newData = <<<EOT
<template>
    <div class="page">
        {$wxml}
    </div>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    {$js}
    export default pageData
</script>
<style lang="scss" scoped>
{$wxss}
</style>
EOT;
            file_put_contents($path . ".vue", $newData);
        }
        $childer = substr($childer, 0, -3);
        $router = <<<EOT
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

{$import}

const router = new Router({
    // mode: 'history',
    base: '/',
    routes: [{$childer}]
  })
router.push('{$entryPath}')
export default router
EOT;
        file_put_contents($this->getPath("/router/index.js"), $router);
        die();
    }

    public function transformWxss($data, $filename)
    {
        $data = preg_replace("/(@import (['\"])[^'\"\r]*)(['\"];)/", "$1.wxss$2;", $data);
        $data = "@import '" . substr(str_pad("", (count(explode("/", $filename)) - 2) * 3, "../"), 0, -1) . "/common/style/page.scss';\r\n" . $data;

        $tag = [
            "view" => "div",
            "block" => "template",
            "image" => "img",
            "swiper" => ".slideitem",
            "navigator" => ".navigator",
            "text" => "span",
            "page" => ".page",
        ];
        foreach ($tag as $k => $v) {
            $data = preg_replace("/([^\S]+)" . $k . "(\s*[\{,\.])/", "$1" . $v . "$2", $data);
        }

        $data = preg_replace("/(\-?[0-9]+)rpx/", "rpx($1)", $data);
        if ($filename == "/pages/article/article") {
            // die();
        }
        return $data;
    }

    public function parseDom($data)
    {
        if ($data->tag == "import") {
            array_push($this->import, $data->getAttribute("src"));
            $data->setAttribute("is_import", "1");
            $data->tag = "div";
        }
        // 替换标签
        $tag = [
            "view" => "div",
            "block" => "template",
            "text" => "span",
            "image" => "img",
            "service" => "div",  // todo
        ];
        if (in_array($data->tag, array_keys($tag))) {
            $data->tag = $tag[$data->tag];
        }

        $attrs = $data->getAllAttributes();
        $attr = [
            "for" => false, // 是否列表
            "for-list" => "", //列表数组
            "key" => "index", // 列表key
            "for-item" => "item", //列表值
            "for-index" => "index", //列表键

            "template" => false, //是否模版
            "temp_name" => "", //模版名称
            "temp_data" => "",
        ];
        foreach ($attrs as $k => $v) {
            switch ($k) {
                case "wx:for":
                    $attr["for"] = true;
                    if (preg_match("/^\{\{([^\}]*)\}\}$/", $v, $re)) {
                        $v = $re[1];
                    }
                    $attr["for-list"] = $v;
                    $data->removeAttribute($k);
                    continue 2;
                    break;
                case "wx:key":
                    // $attr["key"] = $v;
                    $data->removeAttribute($k);
                    continue 2;
                    break;
                case "wx:for-item":
                    $attr["for-item"] = $v;
                    $data->removeAttribute($k);
                    continue 2;
                    break;
                case "wx:for-index":
                    $attr["for-index"] = $v;
                    $data->removeAttribute($k);
                    continue 2;
                    break;
                case "is":
                    if ($data->tag == "template") {
                        $attr["template"] = true;
                        $attr["temp_name"] = $v;
                    }
                    continue 2;
                    break;
                case "style":
                    $v = preg_replace("/url\(['\"]([^'\"]*)['\"]\)/", "url($1)", $v);
                    $data->setAttribute($k, $v);

                    // case "data":
                    //     $attr["temp_data"] = $v;
                    //     continue 2;
                    //     break;

            }
            // if (preg_match("/^\{\{([^\}]*)\}\}$/", $v, $re)) {
            //     $v = $re[1];
            //     $data->removeAttribute($k);
            //     $k = ":" . $k;
            //     $data->setAttribute($k, $v);
            // } elseif (preg_match("/(([^\}]*)\{\{([^\}]*)\}\}([^\}]*))/", $v, $re)) {
            //     $v = ($re[2] ? "'" . $re[2] . "' + " : "") .'('. $re[3] .')'. ($re[4] ? " + '" . $re[4] . "'" : '');
            //     $data->removeAttribute($k);
            //     $k = ":" . $k;
            //     $data->setAttribute($k, $v);
            // }

            if (strpos($v, "{{") !== false) {
                if (strpos($v, '"') !== false) {
                    $v = str_replace('"', "'", $v);
                }
                $y = "'";
                $v = str_replace(["{{", "}}"], [$y . "+(", ")+" . $y], $y . $v . $y);
                $v = str_replace(["+" . $y . $y . "+", "+" . $y . $y . "", "" . $y . $y . "+"], ["", ""], $v);
                $data->removeAttribute($k);
                $k = ":" . $k;
                $data->setAttribute($k, $v);
                if (preg_match("/^\(([^\}]*)\)$/", $v, $re)) {
                    if (strpos($re[1], ":") !== false && strpos($re[1], "?") === false) {
                        $re[1] = "{" . $re[1] . "}";
                    }
                    $v = $re[1];
                    $data->setAttribute($k, $v);
                }
            }

            $v = preg_replace_callback("/(\-?[0-9]+)rpx/", function ($e) {
                return (floatval(str_replace("rpx", "", $e)) / 100) . "rem";
            }, $v);
            $data->setAttribute($k, $v);

            $event = [
              "tap" => "click",
              "input" => "change",
            ];
            if (preg_match("/^bind.*$/", $k)) {
                $data->removeAttribute($k);
                $k = str_replace("bind", "", $k);
                if (in_array($k, array_keys($event))) {
                    $k = $event[$k];
                }
                $k = "@" . $k;
                $data->setAttribute($k, $v);
            }
            if (preg_match("/^catch.*$/", $k)) {
                $data->removeAttribute($k);
                $k = str_replace("catch", "", $k);
                if (in_array($k, array_keys($event))) {
                    $k = $event[$k];
                }
                $k = "@" . $k . ".stop";
                $data->setAttribute($k, $v);
            }

            if (preg_match("/\:?\_+(.*)/", $k, $re)) {
            $data->removeAttribute($k);
                $k = $re[1];
                $data->setAttribute($k, $v);
            }
        }

        //替换属性标签
        $event = [
            // "bindtap" => "@click",
            // "bindchange" => "@change",
            // "bindsubmit" => "@submit",
            // "bindconfirm" => "bindconfirm",
            // "@tap.stop" => "@click.stop",
            // "tap" => "@click.stop",
            // "@input" => "@change",
            // "@input.stop" => "@change.stop",
            "form-type" => "type",
            "wx:if" => "v-if",
            "wx:elseif" => "v-else-if",
            "wx:key" => ":key",
        ];
        foreach ($event as $k => $v) {
            if ($data->hasAttribute($k)) {
                $data->setAttribute($v, $data->getAttribute($k));
                $data->removeAttribute($k);
            }
            $k1 = ":" . $k;
            if ($data->hasAttribute($k1)) {
                $data->setAttribute($v, $data->getAttribute($k1));
                $data->removeAttribute($k1);
            }
        }

        if ($attr["for"]) {
            if ($attr["for-list"] == "class") {
                $attr["for-list"] = "this.class";
            }
            $data->setAttribute("v-for", "(" . $attr["for-item"] . "," . $attr["for-index"] . ") in " . $attr["for-list"]);
            $data->setAttribute(":key", $attr["key"]);
        }

        if ($attr["template"]) {
            $data->tag = $attr["temp_name"];
        }
        $data->tag == "template" && $data->removeAttribute(":key");
        $children = $data->children;
        if (count($children) > 0) {
            foreach ($children as $k => $v) {
                $data->children[$k] = $this->parseDom($v);
            }
        }
        return $data;
    }
    public function transfromWxml($data)
    {
        $html = new simple_html_dom();
        $html->load($data);
        // static $num = 0;
        // $num++;
        // echo $num;
        // if($num == 3){
        //     echo
        // }
        return $this->parseDom($html->root);
        //$html->root;
        // var_dump($html);
        $qute = ["'", '"', "'"];
        $uqute = ["'" => '"', '"' => "'"];

        // $tag = [
        //     "view" => "div",
        //     "block" => "template",
        //     "image" => "img",
        //     "text" => "span",
        // ];
        // foreach ($tag as $k => $v) {
        //     $data = str_replace("<" . $k . ">", "<" . $v . ">", $data);
        //     $data = str_replace("</" . $k . ">", "</" . $v . ">", $data);
        //     $data = str_replace("<" . $k . " ", "<" . $v . " ", $data);

        // }

        $event = [
            "bindtap" => "click",
            "catchtap" => "click.stop",
            "bindchange" => "bindchange",
        ];
        foreach ($event as $k => $v) {
            $data = str_replace(" " . $k . "=", " @" . $v . "=", $data);
        }

        // $refs = [
        //     'swiper'
        // ];
        // foreach($refs as $v){
        //     $data = str_replace("<".$v." ", "<".$v." ref='".$v."' ", $data);
        // }

        foreach ($qute as $k => $v) {
            $data = preg_replace("/wx:if=" . $v . "\{\{([^" . $v . "]*)\}\}" . $v . "/", "v-if=" . $v . "$1" . $v, $data);
            $data = preg_replace("/wx:for=" . $v . "\{\{([^" . $v . "]*)\}\}" . $v . "/", "v-for=" . $v . "(item,index) in $1" . $v . " :key='index'", $data);
            $data = preg_replace("/wx:key=" . $v . "\{\{([^" . $v . "]*)\}\}" . $v . "/", "", $data);
            $data = preg_replace("/wx:key=" . $v . "([^" . $v . "]*)" . $v . "/", "", $data);
            $data = preg_replace("/src=" . $v . "{{([^" . $v . "]*)}}" . $v . "/", ":src=" . $v . "$1" . $v . "", $data);
            $data = preg_replace(
                "/class=" . $v . "([^\{\}\r\'\"]*)\{\{([^\{\}\r]*)\}\}([^\{\}\r\'\"]*)" . $v . "/",
                "class=" . $v . "$1 $3" . $v . " :class=" . $v . "[($2)]" . $v . "",
                $data
            );
            $data = preg_replace(
                "/ data=" . $v . "([^\{\}\r\'\"]*)\{\{([^\{\}\r]*)\}\}([^\{\}\r\'\"]*)" . $v . "/",
                " :data=" . $v . '{$2}' . $v . "",
                $data
            );

            $data = preg_replace(
                "/([\w\-]+)=" . $v . "([^\{\}\r\'\"]*)\{\{([^\{\}\r]*)\}\}([^\{\}\r\'\"]*)" . $v . "/",
                ":$1=" . $v . $uqute[$v] . "$2" . $uqute[$v] . " + ($3) + " . $uqute[$v] . "$4" . $uqute[$v] . $v . "",
                $data
            );
            $data = preg_replace("/([\w\-]+)=" . $v . "\{\{ \{([^\{\}\r]*)\} \}\}" . $v . "/", ":$1=" . $v . '{$2}' . $v . "", $data);
            $data = preg_replace("/v-for=" . $v . "\(item,index\) in ([^" . $v . "]*)" . $v . " ([^\r]*) wx:for-item=['\"]([^'\"]*)['\"]/", "v-for=" . $v . "($3,index) in $1" . $v . " $2", $data);

            $data = preg_replace("/<template ([^\r]*) :key=" . $v . "index" . $v . "/", "<template $1", $data);
        }

        return $data;
    }

    public function transformJs($data)
    {
        return preg_replace("/Page\(/", "const pageData = Page(", $data);
    }

    public function getFile($file)
    {
        if (is_file($this->getPath($file))) {
            $data = file_get_contents($this->getPath($file));
            return $data;
        }
        return "";
    }

    public function getPath($file)
    {
        return $this->path . $file;
    }

    public function readJson($file)
    {
        $data = file_get_contents($this->getPath($file));
        $json = json_decode($data, true);
        return $json;
    }
}
