<template>
    <div class="page">
        <img mode="widthFix" style="width: 7.5rem;" src="/image/card.jpg"></img> <button class="getuserinfo" open-type='getUserInfo' @getuserinfo="getUserInfo"> </button> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
let util = require('../../utils/util.js');
const pageData = Page({
	data: {

	},
	onLoad: function (options) {
		this.hasLogin = false;
	},
	getUserInfo(e) {
		util.updateUserInfo(e.detail, getApp()).then(() => {
			this.hasLogin = true;
			let history = getCurrentPages();
			if (history.length > 1) {
				wx.navigateBack()
				history[history.length - 2].onLoad()
				history[history.length - 2].onShow()
			} else {
				wx.switchTab({
					url: '/pages/article/list',
				})
			}
		});
	},
	onUnload() {
		if (this.hasLogin) {
			return;
		}
		wx.showModal({
			title: '提示',
			content: '请先登录',
			success() {
				wx.navigateTo({
					url: '/pages/login/login',
				})
			}
		})
	}
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
.getuserinfo {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: transparent;
}

</style>