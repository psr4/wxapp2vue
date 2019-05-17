  import {wx,getApp,App,Page} from '@/common/js/Weapp' 
var util = require('/utils/util.js')
let appData = App({
    onLaunch: function (e) {
		var scene = decodeURIComponent(e.query.scene);
		var str = util.parse_str(scene);
		var tjid;
		if(str){
			if(str.i){
				tjid = str.i;
			}
			if(str.p){
				wx.showLoading({
					title: '正在跳转...',
				})
				setTimeout(function () {
					wx.hideLoading();
					var url ="";
					for(var i in str){
						if (i != "p" && i != "i") {
							url += "&" + i + "=" + str[i];
						}
					}
					wx.navigateTo({
						url: '/pages/' + str.p + "?" + url.substring(1),
					})
				},1000)
			}
		}else{
			tjid = scene;
		}
		wx.setStorageSync("scene", tjid);
		// util.login(this, tjid);
    },
    globalData: {
        userInfo: {},
        title: "欧亮创客美",
		formId: []
	},
	onHide() {
		if (this.globalData.formId.length > 0) {
			util.getAjaxData('formId', { id: this.globalData.formId }, (e) => {
				this.globalData.formId = []
			}, "POST")
		}
	}
})          

  export default appData; 
