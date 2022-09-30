let layer = layui.layer
$(function () {
  getUserInfo()
})
// 获取信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success(res) {
      if (res.code !== 0) {
        return layer.msg('获取信息失败')
      }
      // layer.msg('获取信息成功')
      // console.log(res)
      // 调用renderAvatar渲染用户头像
      renderAvatar(res.data)
    }
  })
}

// 渲染用户头像
function renderAvatar(user) {
  // 获取用户名称
  let name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 渲染用户头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}