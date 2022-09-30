$(function () {
  // 从layui获取layer和form
  const layer = layui.layer
  const form = layui.form


  // // 将键值对转换JSON字符串格式
  // const format2Json = (source) => {
  //   let target = {}
  //   source.split('&').forEach(el => {
  //     let kv = el.split('=')
  //     target[kv[0]] = kv[1]
  //   })
  //   return JSON.stringify(target)
  // }


  $('#go2Reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#go2Login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  // 自定义验证
  form.verify({
    // 验证密码
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 判断两次密码是否一致
    repwd: function (value) {
      // let pwd = $('.reg-box [name=password]').val()
      let pwd = $('#password').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 给注册表单添加提交事件
  $('#formReg').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      // data: JSON.stringify({
      //   username: $('.reg-box [name=username]').val(),
      //   password: $('.reg-box [name=password]').val(),
      //   repassword: $('.reg-box [name=repassword]').val()
      // }),
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg('注册成功')
        $('#go2Login').click()
      }
    })
  })

  // 给登录表单添加提交事件
  $('#formLogin').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg('登录成功')
        localStorage.setItem('big_new_token',res.token)
        location.href='/index.html'
      }
    })
  })
})