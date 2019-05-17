<?php
  include_once "html_loader.php";
  $json = new wxa();
  $json->dirname("weapp")->save(__DIR__ . "/src/weapp")->open("F:/xcx/ouliang")->run();

  class wxa
  {
    private static $wxa;
    private $openPath;  //打开路径
    private $savePath;  //保存路径
    private $appJson;
    private $import = [];
    private $replace = [];
    private $dirname = "weapp";

    public function open($path)
    {
      $this->openPath = $path;
      return $this;
    }

    public function dirname($name)
    {
      $this->dirname = $name;
      return $this;
    }

    public function save($path)
    {
      $this->savePath = $path;
      return $this;
    }

    public function run()
    {
      $this->Page2Vue();
    }

    public function saveFile($file, $data, $mode = 1)
    {
      $file = $this->getPath($file, 'save');
      $dir = dirname($file);
      if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
      }
      file_put_contents($file, $data, $mode);
    }

    public function openFile($file)
    {
      return file_get_contents($this->getPath($file));
    }

    public function buildRouter()
    {
      $page = $this->Page;
      $import = "";
      $childer = "";
      foreach ($page as $k => $v) {
        $v = "/" . $v;
        $name = str_replace('/', "_", $v);
        if (!isset($entry)) {
          $entry = $name;
          $entryPath = $v;
        }
        $import .= "import " . $name . " from '@" . "/" . $this->dirname . $v . ".vue'; \r\n";
        $childer .= <<<EOT
	{
		path: '{$v}',
		name: '{$name}',
		component: {$name}
	},\r\n
EOT;
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

router.afterEach((to, from) => {
  if (window.tabBar && window.tabBar.list) {
    let tabbar = false
    let list = window.tabBar.list
    for (let i = 0; i < list.length; i++) {
      if ('/' + list[ i ].pagePath === to.path) {
        tabbar = true
      }
    }
    const timer = setInterval(() => {
      console.log('tabbar')
      if (!window.vm) {
        return
      }
      clearInterval(timer)
      window.vm.\$store.commit('SET_WEAPP_TABBAR', tabbar)
    }, 10)
  }
  if (to.path === '/') {
    router.push(router.options.routes[ 0 ].path)
  }
  clearTimeout(this.timer)
  this.timer = setTimeout(() => {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent('Redirect')
    document.dispatchEvent(e, true, true);
  }, 500)
})

export default router
EOT;
      $this->saveFile("/../router/index.js", $router);
    }

    public function buildPage()
    {
      $page = $this->Page;
      $importData = "
	import Vue from 'vue';
";
      foreach ($page as $k => $v) {
        $v = "/" . $v;
        $template = "";
        $wxml = $this->transfromWxml($v);
        $import = array_unique($this->import);
        foreach ($import as $k => $v1) {
          list($path, $file) = explode("|", $v1);
          $pos = strripos($path, "/");
          $importData .= $this->transformImport(substr($path, 0, $pos) . "/" . $file);
        }
        $wxss = $this->transformWxss($v);
        $js = $this->transformJs($v);
        //$json = $this->getFile($v . ".json");
        $newData = <<<EOT
<template>
    <div class="page">
        {$wxml}
    </div>
</template>
<script>
    {$js}
    export default pageData
</script>
<style lang="scss" scoped>
{$wxss}
</style>
EOT;
        $this->saveFile($v . ".vue", $newData);
      }
      $this->saveFile("/import.js", $importData);
    }

    public function Page2Vue()
    {
      $this->buildEntry();
      $this->buildPage();
      $this->moveAnotherFile();
      $this->buildRouter();
    }

    public function buildEntry()
    {
      $this->appJson = $this->readJson("/app.json");
      $this->Page = $this->appJson["pages"];

      // 移动全局样式
      //$appWxss = $this->transformWxss("/app");
      //$this->saveFile('/app.scss',$appWxss);
      //$appJs = $this->getFile("/app.js");

    }

    public function moveAnotherFile()
    {
      $page = $this->Page;
      $file = $this->scan($this->openPath);
      foreach ($file as $k => $v) {
        $truePath = $v;
        $pathinfo = pathinfo($truePath);
        $basePath = substr(str_replace($this->openPath, "", $pathinfo["dirname"]) . "/" . $pathinfo["filename"], 1);
        if (!$basePath || in_array($basePath, $page)) { // || in_array($pathinfo["extension"], ["wxml"])
          continue;
        }
        $filename = "/" . $basePath;
        if ($pathinfo["extension"] == "wxml") {
          $data = $this->transfromWxml($filename);
        } elseif ($pathinfo["extension"] == "wxss") {
          $pathinfo["extension"] = "scss";
          $data = $this->transformWxss($filename);
        } elseif ($pathinfo["extension"] == "js") {
          $data = $this->transformJs($filename);
        } else {
          $data = $this->getFile($filename . "." . $pathinfo["extension"]);
        }
        $saveName = $filename . "." . $pathinfo["extension"];
        if ($saveName === '/app.js') {
          $appFoot = <<<EOF
          \r\n
  export default appData; \r\n
EOF;
          $data = preg_replace("/App\s*\(/", "let appData = App(", $data);
          $data = $data . $appFoot;
        }
        $this->saveFile($saveName, $data);
      }
    }

    public function scan($path)
    {
      $handle = opendir($path);
      $file_arr = [];
      while ($file = readdir($handle)) {
        if (!in_array($file, [".", "..", ".git"])) {
          $newPath = $path . "/" . $file;
          if (is_dir($newPath)) {
            $file_arr = array_merge($file_arr, $this->scan($newPath));
          } else {
            $file_arr[] = $newPath;
          }
        }
      }
      return $file_arr;
    }

    public function transformImport($file)
    {
      $this->import = [];
      $this->replace = [];
      $data = $this->getFile($file);
      if (!$file) {
        return;
      }
      $html = new simple_html_dom();
      $html->load($data);
      return $this->parseImport($html->root, $file);
    }

    public function parseImport($data, $file)
    {
      if ($data->tag == "template" && $data->hasAttribute('name')) {
        $tempname = $data->getAttribute('name');
        $data->tag = "div";
        $children = $data->children;
        if (count($children) > 0) {
          foreach ($children as $k => $v) {
            $data->children[$k] = $this->parsePage($v, $file);
          }
        }
        $template = <<<EOF
	Vue.component('$tempname',{
		template: `$data`,
		data(){
		  return {}
		},
		props:{
			data:{}
		}
	});\r\n
EOF;
        return $template;
      }
      $children = $data->children;
      $js = "";
      if (count($children) > 0) {
        foreach ($children as $k => $v) {
          $js .= $this->parseImport($v, $file);
        }
      }
      return $js;
    }

    public function transformWxss($filename)
    {
      $data = $this->openFile($filename . ".wxss");
      $data = preg_replace("/(@import (['\"])[^'\"\r]*)\.wxss(['\"];)/", "$1.scss$2;", $data);
      $data = "@import '" . substr(str_pad("", (count(explode("/", $filename)) - 1) * 3, "../"), 0, -1) . "/common/style/page.scss';\r\n" . $data;

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

    public function parsePage($data, $file)
    {
      if ($data->tag == "import") {
        array_push($this->import, $file . "|" . $data->getAttribute("src"));
        $data->setAttribute("is_import", "1");
        $data->tag = "div";
      } elseif ($data->tag == "include") {
        $pathinfo = pathinfo($file);
        $include = $data->getAttribute("src");
        $path = $pathinfo["dirname"] . "/" . $include;
        $this->replace[$data->outertext()] = $this->transfromWxml(substr($path, 0, -5));;
      }
      // 替换标签
      $tag = [
        "view" => "div",
        "block" => "template",
        "text" => "span",
        "image" => "img",
        "service" => "div",
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

        }

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
            if (strpos($re[1], ":") !== false && strpos($re[1], "://") === false && strpos($re[1], "?") === false) {
              $re[1] = "{" . $re[1] . "}";
            }
            $v = $re[1];
            $data->setAttribute($k, $v);
          }
          $v = '(' . $v . ')';
        }

        $v = preg_replace_callback("/(\-?[0-9]+)rpx/", function ($e) {
          return ($e[1] / 100) . "rem";
        }, $v);
        $data->setAttribute($k, $v);

        $event = [
          "tap" => "click",
          "input" => "keyDown",
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
          $data->children[$k] = $this->parsePage($v, $file);
        }
      }
      return $data;
    }

    public function transfromWxml($file)
    {
      $this->import = [];
      $this->replace = [];
      $data = $this->getFile($file . ".wxml");
      $html = new simple_html_dom();
      $html->load($data);
      $wxml = $this->parsePage($html->root, $file) . " ";
      $replace = array_unique($this->replace);
      foreach ($replace as $k => $v) {
        $wxml = str_replace($k, $v, $wxml);
      }
      return $wxml;
    }

    public function transformJs($file)
    {
      $data = $this->getFile($file . ".js");
      $data = preg_replace("/Page\(/", "const pageData = Page(", $data);
      $data = preg_replace("/import[\s]*(\w+)[\s]*from[\s]*['\"]([^'\"]*)['\"]/",
        "const $1 = require('$2');", $data);
//      $data = preg_replace("/module.exports\s*=/", "export default ", $data);
      if (strpos($data, "module.exports") !== false) {
        $appHead = <<<EOF
  let commonWeapp = require('@/common/js/Weapp') 
  let wx = commonWeapp.wx
  let getApp = commonWeapp.getApp
  let App = commonWeapp.App
  let Page = commonWeapp.Page\r\n
EOF;
      } else {
        $appHead = <<<EOF
  import {wx,getApp,App,Page} from '@/common/js/Weapp' \r\n
EOF;
      }
      return $appHead . $data;
    }

    public function getFile($file)
    {
      if (is_file($this->getPath($file))) {
        $data = file_get_contents($this->getPath($file));
        return $data;
      }
      return "";
    }

    public function getPath($file, $mode = 'open')
    {
      if ($mode == 'open') {
        $path = $this->openPath . $file;
      } else {
        $path = $this->savePath . $file;
      }
      return $path;
    }

    public function readJson($file)
    {
      $data = $this->openFIle($file);
      $json = json_decode($data, true);
      return $json;
    }
  }
