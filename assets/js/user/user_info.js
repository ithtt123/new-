$(function () {
  const layer = layui.layer
  const form = layui.form

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return alert('昵称长度必须在1~6个字符之间')
      }
    }
  })

  const initInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.code !== 0) return layer.msg('请求用户信息失败')
        // console.log(res)
        form.val('formUserInfo', res.data)
      }
    })
  }
  initInfo()

  // 给重置按钮添加点击事件
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initInfo()
  })

  // 监听表单提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data:form.val('formUserInfo'),
      // data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面函数
        window.parent.getUserInfo()
      }
    })
  })
})