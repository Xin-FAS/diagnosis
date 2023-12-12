/**
 * @author Xin-FAS
 */

class Utils {
    constructor (props) {
        this.baseUrl = 'http://124.223.69.156:3300/pz'

    }
    // 获取用户信息
    getUserInfo () {
        // 调用登录的api
        uni.login({
            success: res => {
                this.request({
                    url: '/auth/wxLogin',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        console.log(res, 'res')
                    }
                })
            }
        })
    }
    // 封装请求
    request (options = {
        showLoading: false
    }) {
        // 判断url是否存在
        if (!options.url) return
        uni.showLoading({
            title: '请求中...'
        })
        // 判断是否需要loading效果
        if (options.showLoading) this.showLoading()
        // 发送
        uni.request({
            url: this.baseUrl + options.url,
            data: options.data || {},
            header: options.header || {},
            method: options.method || 'GET',
            success: response => {
                uni.hideLoading()
                // 后端返回的数据异常
                if (response.data.code !== 10000) {
                    // 将失败的结果返回回去
                    if (options.fail && typeof options.fail === 'function') options.fail(response)
                } else {
                    // 将失败的结果返回回去
                    if (options.success && typeof options.success === 'function') options.success(response)
                }
            },
            fail: res => {
                uni.hideLoading()
                console.log(res)
            }
        })
    }
    // 创建加载的loading效果
    showLoading () {
        const isShowLoading = uni.getStorageSync('isShowLoading')
        if (isShowLoading) {
            uni.hideLoading()
            uni.setStorageSync('isShowLoading', false)
        }
        uni.showLoading({
            title: '加载中...',
            complete: () => {
                uni.setStorageSync('isShowLoading', true)
            },
            fail: () => {
                uni.setStorageSync('isShowLoading', false)
            }
        })

    }
}

export default new Utils()
