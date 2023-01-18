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
  res.header("Access-Control-Allow-Origin","http://localhost:3004");
  res.header("Access-Control-Allow-Origin","https://xkong-study.github.io/urban/");
  res.header("Access-Control-Allow-Origin","https://maps.googleapis.com/maps/api/place");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});



app.get('/api/add', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
        var id = req.query.id;
        var subtitle = req.query.name;
        var comment = req.query.comment;
        var score = req.query.score;
        var search=req.query.search;
        let sql ="INSERT INTO demo(id,subtitle,comment,score,search) values(?,?,?,?,?)";
            connection.query(sql,[id,subtitle,comment,score,search], function (error, results, fields) {
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
    let sql = 'select * from demo';
    connection.query(sql,function (err, results) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.json(results)
        console.log(results)
        return;
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
    var search = req.query.search;
    let sql = 'select * from demo where search=?';
    connection.query(sql,[search],function (err, results) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          }
          res.json(results)
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
        let abc=['a','b','c','d','e','f','g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let [max,min]=[Math.floor(Math.random()*(10-7+1)+1),Math.floor(Math.random()*(17-10+1)+17)];
        abc=abc.sort(()=>0.4-Math.random()).slice(max,min).slice(0,8).join("");
        var a=new Date().getTime()+abc;
        var id = a;
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
        var score = req.query.title;
        var comment = req.query.text;
        let sql ="update demo set score=?,comment=? where id=?";
            connection.query(sql,[score,comment,id], function (error, results, fields) {
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
    var username = req.query.username;
    var password = req.query.password;
    let sql ="INSERT INTO Comment1(id,username,password) values(?,?,?)";
        connection.query(sql,[id,username,password], function (error, results, fields) {
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
    var username = req.query.username;
    var password = req.query.password;
    let sql ="INSERT INTO Comment1(id,username,password) values(?,?,?)";
        connection.query(sql,[id,username,password], function (error, results, fields) {
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
                return;
            }

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
    var subtitle = req.query.name;
    var comment = req.query.comment;
    var score = req.query.score;
    let sql ="update demo set subtitle=?,comment=?,score=? where id=?";
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
                return;
            }
        })
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
    var subtitle = req.query.title;
    var comment = req.query.text;
    let sql ="select id,subtitle,comment from demo where id=?";
        connection.query(sql,[id,subtitle,comment], function (error, results, fields) {
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
                return;
            }
        });
    })

app.get('/api/delete', (req, res) => {
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2000630kxr',
    database:'camera'
});
    var query = req.query.id;
        connection.query(`DELETE FROM demo where id=${query}`, function (error, results, fields) {
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
                res.json(results)
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
    var text = req.query.name;
    var comment = req.query.comment;
    var score = req.query.score;
//     if(name==''){
//     let sql = 'SELECT * FROM demo';
//     connection.query(sql,function (err, result) {
//           if(err){
//             console.log('[SELECT ERROR] - ',err.message);
//             return;
//           }
//          str = JSON.stringify(result);
//          console.log(str);
//     })
// }
    let sql = `SELECT * FROM demo where text like '${text}'`;
        connection.query(sql,[text], function (error, results, fields) {
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
                return;
            }

        });
    })

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


module.exports = app;
