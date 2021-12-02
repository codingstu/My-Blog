// sql语句
var sqlblog = {
  // 用户
  blog: {
    add: 'insert ignore into blog( title, author, content) values (?, ?, ?)',
  },
}

module.exports = sqlblog
