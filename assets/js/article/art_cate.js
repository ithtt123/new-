$(function () {
  const layer = layui.layer
  const form = layui.form
  initCateList()
  // 获取文章分类列表
  function initCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        if (res.code !== 0) return layer.msg('获取文章分类失败！')
        const htmlStr = template('tpl_cate', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 为添加类别按钮绑定点击事件
  let index = null
  $('#btnAdd').on('click', function () {
    index = layer.open({
      type: 1,
      title: '添加分类名称',
      area: ['500px', '260px'],
      content: $('#addDialog').html()
    })
  })

  let isEdit = false
  // 给表单绑定提交事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),
        success(res) {
          if (res.code !== 0) return layer.msg('修改分类失败！')
          layer.msg('修改分类成功！')
          initCateList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize(),
        success(res) {
          if (res.code !== 0) return layer.msg('新增分类失败！')
          layer.msg('新增分类成功！')
          initCateList()
        }
      })
    }
    // 恢复默认
    isEdit = false
    layer.close(index)
  })

  // 为编辑按钮绑定点击事件
  $('tbody').on('click', '.btnEdit', function () {
    isEdit = true
    index = layer.open({
      type: 1,
      title: '修改分类名称',
      area: ['500px', '260px'],
      content: $('#addDialog').html()
    })
    const id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: `/my/cate/info?id=${id}`,
      success(res) {
        if (res.code !== 0) return layer.msg('获取分类详情失败！')
        // layer.msg('获取分类详情成功！')
        // 快速获取表单
        form.val('addFormFilter', res.data)
      }
    })
  })

  // 为删除按钮绑定点击事件
  $('tbody').on('click', '.btnDelete', function () {
    // 提示用户是否要删除
    const result = confirm('确定要删除吗')
    const id = $(this).attr('data-id')
    if (result) {
      $.ajax({
        method: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success: function (res) {
          if (res.code !== 0) return layer.msg('删除分类失败！')
          layer.msg('删除分类成功！')
          initCateList()
        }
      })
    }

  })
})