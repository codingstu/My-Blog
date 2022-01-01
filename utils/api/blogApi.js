var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
// var $sql = require('../sqlblog')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = (res, ret) => {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败',
    })
  } else {
    res.json(ret)
  }
}
// 增加blog接口
// POST 请求
router.post('/addBlog', (req, res) => {
  let sql =
    'insert ignore into blog( title, author, content,md, logo ) values (?, ?, ?, ?,?)'
  let params = req.body
  console.log(params)
  // ! [params.username, params.age] 自动填充到之前 ？ 里面
  conn.query(
    sql,
    [params.title, params.author, params.content, params.md, params.logo],
    (err, result) => {
      if (err) return console.log(err)
      if (result) {
        jsonWrite(res, result)
      }
    },
  )
})

//获取列表数据接口
router.get('/getBlog', (req, response) => {
  let title = req.query.title
  let author = req.query.author
  let content = req.query.content

  let params = req.body

  // let pageNo = Number(req.body.page) || 1
  // let pageCount = Number(req.body.pageSize) || 10
  // let pageSize = pageCount
  // let page = (pageNo - 1) * pageCount

  // console.log(page, pageSize)
  // 查询语句
  let sql1 = `SELECT * FROM blog ORDER BY id ASC` //递增查询
  conn.query(sql1, (err, res) => {
    if (err) {
      throw err
      return
    } else {
      // console.log(res)
      response.json(res)
    }
  })
})

//查询接口
router.get('/searchBlog', (req, response) => {
  // let title = req.query.title
  // let author = req.query.author
  // let content = req.query.content

  // let params = req.body
  // 查询语句
  let sql1 = `select * from blog where title like ?` //模糊查询
  conn.query(sql1, ['%' + req.query.title + '%'], (err, res) => {
    if (err) {
      throw err
      return
    } else {
      console.log(res)
      response.json(res)
    }
  })
})

// blog删除接口
// post 请求
router.post('/delBlog', (req, res) => {
  // console.log('删除', title)
  // const sql = 'delete from blog ORDER BY title limit 1'
  // let title = req.query.title;
  let sql2 = `DELETE FROM blog WHERE title=?`
  conn.query(sql2, [req.body.title], (err, result) => {
    if (err) return res.json({ code: 404, message: err, affectedRows: 0 })
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
