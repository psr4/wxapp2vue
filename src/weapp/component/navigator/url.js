  import {wx,getApp,App,Page} from '@/common/js/Weapp' 
let app = getApp()
Component({
	properties: {
		url: {
			type: String,
			value: ''
		},
		openType: {
			type: String,
			value: 'navigate'
		},
		data: {
			type: Object
		},
		block: {
			type: Number,
			value: 0
		}
	},
	data: {},
	methods: {
		tap_event(e) {
			console.log(e)
			const url = this.data.url
			this.triggerEvent('click', this.data.data, {})
			app.globalData.formId.push(e.detail.formId)
			if (url != "") {
				switch (this.data.openType) {
					case 'navigate':
						wx.navigateTo({
							url: url,
						})
						break;
					case 'redirect':
						wx.redirectTo({
							url: url,
						})
						break;
					case 'switchTab':
						wx.switchTab({
							url: url,
						})
						break;
				}
			}
		}
	}
})
