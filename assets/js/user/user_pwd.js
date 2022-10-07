$(function () {
  const layer = layui.layer
  const form = layui.form

  // 定义验证方法
  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    newPwd: function (value) {
      if (value === $('[name=old_pwd]').val()) {
        return '新旧密码不能一样'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=new_pwd]').val()) {
        return '两次密码不一致'
      }
    }
  })

  // 监听表单提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) {
          return layer.msg('修改密码失败！')
        }
        layer.msg('修改密码成功！')
        $('.layui-form')[0].reset()
      }
    })
  })
  
})