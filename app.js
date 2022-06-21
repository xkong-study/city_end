var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:3001");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});

function closeMysql(connect) {
    connect.end((err) => {
        if (err) {
            console.log(`mysql关闭失败:${err}!`);
        } else {
            console.log('mysql关闭成功!');
        }
    })
}


app.get('/api/delete', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var query = req.query.id;
        connection.query(`DELETE FROM Comment where id=${query}`, function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                 closeMysql(connection)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                }
                var  sql = 'SELECT * FROM Comment';
                connection.query(sql,function (err, result) {
                        if(err){
                          console.log('[SELECT ERROR] - ',err.message);
                          return;
                        }
                       str = JSON.stringify(result);
                       console.log(result);
                });
                res.json(result)
                 closeMysql(connection)
                return;
            }
        });
    })

app.get('/api/add', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var id = req.query.id;
    var name = req.query.name;
    var comment = req.query.comment;
    var score = req.query.score;
    let sql ="INSERT INTO Comment(id,name,comment,score) values(?,?,?,?)";
        connection.query(sql,[id,name,comment,score], function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                }
                 var  sql = 'SELECT * FROM Comment';
                 connection.query(sql,function (err, result) {
                  if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
                  }
                  str = JSON.stringify(result);
                  console.log(result);
               });
                  res.json(result)
                  closeMysql(connection)
                return;
            }
        });
    })

app.get('/api/All', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    let sql = 'select * from Comment';
    connection.query(sql,function (err, results) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.json(results)
        closeMysql(connection)
        return;
    });
})


app.get('/api/modify', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var id = req.query.id;
    var name = req.query.name;
    var comment = req.query.comment;
    var score = req.query.score;
    let sql ="update Comment set name=?,comment=?,score=? where id=?";
        connection.query(sql,[name,comment,score,id], function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                    results
                }
                 var  sql = 'SELECT * FROM Comment';
                 connection.query(sql,function (err, result) {
                 if(err){
                 console.log('[SELECT ERROR] - ',err.message);
                 return;
                 }
                 str = JSON.stringify(result);
                 console.log(result);
                 });
                 res.json(result)
                 closeMysql(connection)
                 return;
            }
        });
    })


app.get('/api/findAll', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var id = req.query.id;
    var name = req.query.name;
    var comment = req.query.comment;
    var score = req.query.score;
    if(name==''){
    let sql = 'SELECT * FROM Comment';
    connection.query(sql,function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          }
         str = JSON.stringify(result);
         console.log(str);
    })
}
    let sql = 'select * from Comment ';
    sql +=`where name like "%${name}%" `;
        connection.query(sql,[id,name,comment,score], function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                    results
                }
                 res.json(results)
                 closeMysql(connection)
                return;
            }

        });
    })


app.get('/api/write', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    let sql = 'select * from demo';
    connection.query(sql,function (err, results) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          }
          res.json(results)
          closeMysql(connection)
          return;
        });
    })


app.get('/api/addWrite', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
        var id = req.query.id;
        var title = req.query.title;
        var text = req.query.text;
        let sql ="INSERT INTO demo(id,title,text) values(?,?,?)";
            connection.query(sql,[id,title,text], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    var result = {
                        status: 405,
                        errMsg: '失败',
                    }
                    res.json(result)
                    return;

                } else {
                    var result = {
                        code: 200,
                        errMsg: '成功',
                    }
                     var  sql = 'SELECT * FROM demo';
                     connection.query(sql,function (err, result) {
                      if(err){
                      console.log('[SELECT ERROR] - ',err.message);
                      return;
                      }
                      str = JSON.stringify(result);
                      console.log(result);
                   });
                      res.json(result)
                      closeMysql(connection)
                    return;
                }
            });
        })



app.get('/api/updateWrite', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
        var id = req.query.id;
        var title = req.query.title;
        var text = req.query.text;
        let sql ="update demo set title=?,text=? where id=?";
            connection.query(sql,[title,text,id], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    var result = {
                        status: 405,
                        errMsg: '失败',
                    }
                    res.json(result)
                    return;

                } else {
                    var result = {
                        code: 200,
                        errMsg: '成功',
                    }
                     var  sql = 'SELECT * FROM demo';
                     connection.query(sql,function (err, result) {
                      if(err){
                      console.log('[SELECT ERROR] - ',err.message);
                      return;
                      }
                      str = JSON.stringify(result);
                      console.log(result);
                   });
                      res.json(result)
                      closeMysql(connection)
                    return;
                }
            });
        })


app.get('/api/deleteWrite', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
})
    var query = req.query.id;
        connection.query(`DELETE FROM demo where id=${query}`, function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                 closeMysql(connection)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                }
                var  sql = 'SELECT * FROM demo';
                connection.query(sql,function (err, result) {
                        if(err){
                          console.log('[SELECT ERROR] - ',err.message);
                          return;
                        }
                       str = JSON.stringify(result);
                       console.log(result);
                })
                res.json(result)
                 closeMysql(connection)
                return;
            }
        })
    })


app.get('/api/findWrite', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var id = req.query.id;
    var title = req.query.title;
    var text = req.query.text;
    let sql ="select id,title,text from demo where id=?";
        connection.query(sql,[id,title,text], function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                    results
                }
                 res.json(results)
                 closeMysql(connection)
                return;
            }

        });
    })

app.get('/api/info', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    let sql ="select * from Comment1";
        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                    results
                }
                 res.json(results)
                 closeMysql(connection)
                return;
            }

        });
    })


app.get('/api/addInfo', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var id = req.query.id;
    var author = req.query.author;
    var comments = req.query.comments;
    var value = req.query.value;
    let sql ="INSERT INTO Comment1(id,author,comments,value) values(?,?,?,?)";
        connection.query(sql,[id,author,comments,value], function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {

                var result = {
                code: 200,
                errMsg: '成功',
                }
              var  sql = 'SELECT * FROM Comment1';
              connection.query(sql,function (err, result) {
              if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
                                 }
              str = JSON.stringify(result);
              console.log(result);
             });
             res.json(result)
             closeMysql(connection)
             return;
             }
        });
    })

app.get('/api/addLikes', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var id = req.query.id;
    var likes = req.query.likes;
    let sql =" update Comment1 set likes=? where id=?";
        connection.query(sql,[likes,id], function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                    results
                }
                var id = req.query.id;
                let sql ="select * from Comment1";
                connection.query(sql,function (err, result) {
                              if(err){
                              console.log('[SELECT ERROR] - ',err.message);
                              return;
                              }
                              str = JSON.stringify(result);
                              console.log(result);
                             });
                 res.json(results)
                 closeMysql(connection)
                return;
            }

        });
    })


app.get('/api/disLikes', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var id = req.query.id;
    var dislikes = req.query.dislikes;
    let sql =" update Comment1 set dislikes=? where id=?";
        connection.query(sql,[dislikes,id], function (error, results, fields) {
            if (error) {
                console.log(error);
                var result = {
                    status: 405,
                    errMsg: '失败',
                }
                res.json(result)
                return;

            } else {
                var result = {
                    code: 200,
                    errMsg: '成功',
                    results
                }
                var id = req.query.id;
                let sql ="select * from Comment1";
                connection.query(sql,function (err, result) {
                              if(err){
                              console.log('[SELECT ERROR] - ',err.message);
                              return;
                              }
                              str = JSON.stringify(result);
                              console.log(result);
                             });
                 res.json(results)
                 closeMysql(connection)
                return;
            }

        });
    })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
