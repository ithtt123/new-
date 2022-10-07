$.ajaxPrefilter(function (options) {
  // 将键值对转换JSON字符串格式
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach(el => {
      let kv = el.split('=')
      target[kv[0]] = decodeURIComponent(kv[1])
    })
    return JSON.stringify(target)
  }
  // 统一设置根路径
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url

  // 统一设置headers请求头
  options.contentType = 'application/json'

  // 将键值对转换JSON字符串格式
  options.data = options.data && format2Json(options.data)

   // 统一设置headers请求头
   if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('big_new_token') || ''
    }
  }

  // 全局统一挂载complete无论成功还是失败都会调用这个函数
  options.complete = function (res) {
    // console.log(res)
    // responseJSON可以拿到服务器响应的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 强制清空本地存储toktn
      localStorage.removeItem('big_new_token')
      // 强制跳转页面到login
      location.href = 'login.html'
    }
  }


})