$.ajaxPrefilter(function (options) {
  // 将键值对转换JSON字符串格式
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach(el => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
  // 统一设置根路径
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url

  // 统一设置headers请求头
  options.contentType = 'application/json'

  // 将键值对转换JSON字符串格式
  options.data = format2Json(options.data)



})