var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./app', { title: 'Express' });
});

// 显示全部数据
router.get('/api/All', function(req, res, next) {
  res.send(str);
});


module.exports = router;
