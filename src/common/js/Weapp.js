import Vue from 'vue'
import Gstorage from 'good-storage'
import ajax from './ajax'
import router from '../../router/index.js'

import swiper from '../components/swiper.vue'
import swiperItem from '../components/swiperItem.vue'
import navigator from '../components/navigator.vue'
import page from '../components/page.vue'

const components = {
  swiper,
  swiperItem,
  navigator,
  url: navigator,
  page
}

const default_method = {
  setData(obj) {
    for (let i in obj) {
      this[i] = obj[i]
      this.data[i] = obj[i] 
    }
    this._refreshDom();
	window.vm.$forceUpdate()
  },
  _refreshDom() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      var e = document.createEvent("MouseEvents");
      e.initMouseEvent('refreshDom')
      document.dispatchEvent(e, true, true);
    }, 500)
  }
}
export function Page(pageData) {
  let methods = { ...default_method
  };
  for (const i in pageData) {
    if (typeof pageData[i] == 'function') {
      methods[i] = pageData[i]
    }
  }
  pageData.data.options = {}
  return {
    data() {
      return { ...pageData.data,
        ...{
          data: pageData.data
        }
      }
    },
    mounted() {
      // setTimeout(() => {
      //   wx.showModal({
      //     title: '登录失败',
      //     content: '原因',
      //     success: function (res2) {
      //       console.log(res2)
      //     }
      //   })
      // }, 1000)
      this.options = this.$route.query
      this.onLoad && this.onLoad(this.$route.query)
    },
    activated() {
      this.options = this.$route.query
      this.onLoad && this.onLoad(this.$route.query)
      this.onShow && this.onShow(this.$route.query)
    },
    methods,
    components
  }
}
let app = {
	globalData:{
	}
}

export function getApp() {
  observe(app)
  return app
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};
function defineReactive(data, key, val) {
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: true, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            val = newVal;
        }
    });
}


let confirm_show = true
export const wx = {
  getLocation(obj) {
    const type = obj.type
    obj.success({
      latitude: '',
      longitude: ''
    })
    // obj.fail({})
  },
  showModal(obj) {
    const vm = window.vm
    vm && vm.$confirm({
      title: obj.title,
      content: obj.content,
      yesText: '确定'
    }).then(() => {
      const res = {
        confirm: true
      }
      obj.success && obj.success(res)
    }).catch(() => {
      const res = {
        confirm: false
      }
      obj.success && obj.success(res)
    })
  },
  showNavigationBarLoading(){},
  showLoading(obj) {
    const vm = window.vm
    const title = obj.title ? obj.title : '加载中...'
    vm && vm.$loading(obj.title)
  },
  hideLoading() {
    const vm = window.vm
    vm && vm.$loading.close()
  },
  onPullUpLoad() {
    this.onReachBottom && this.onReachBottom()
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent('Redirect')
    document.dispatchEvent(e, true, true);
  },
  getExtConfig() {
    return;
  },
  hideNavigationBarLoading() {},
  setStorage(obj) {
    this.setStorageSync(obj.key, obj.data)
    obj.success && obj.success()
    obj.complete && obj.complete()
  },
  setStorage(obj) {
    const data = this.getStorageSync(obj.key)
    obj.success && obj.success({
      data
    })
    obj.complete && obj.complete({
      data
    })
  },
  getStorage(obj) {
    this.setStorageSync(obj.key, obj.data)
    obj.success && obj.success()
    obj.complete && obj.complete()
  },
  setStorageSync(key, value) {
    Gstorage.set(key, value)
  },
  getStorageSync(key) {
    return Gstorage.get(key)
  },
  stopPullDownRefresh() {},
  navigateTo(obj) {
    router.push(obj.url)
  },
  switchTab(obj) {
    this.navigateTo(obj)
  },
  redirect(obj) {
    this.navigateTo(obj)
  },
  getUserInfo(obj) {
    console.log(obj)
  },
  request(obj) {
    console.log(obj.url)
    if (obj.method == "POST") {
      ajax.post(obj.url, obj.data).then(obj.success)
    } else {
      ajax.get(obj.url, obj.data).then(obj.success)
    }
    // .catch(obj.fail)
  }
}
