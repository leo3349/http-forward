const http = require('http');
const utils = require('./utils');
// 创建http服务
let app = http.createServer(function (req, res) {
    if (!req.headers) {
        req.headers = {}
    }
    req.headers['x-real-ip'] = utils.getClientIP(req)
    console.log('forward-start', req.method, req.url)
    var sreq = http.request({
        host: '127.0.0.1', // 目标主机
        port: 3001,// 目标主机端口
        path: req.url, // 目标路径
        method: req.method,// 请求方式
        headers: req.headers
    }, function (sres) {
        sres.pipe(res);
        sres.on('end', function () {
            console.log('forward-done', req.method, req.url)
        });
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
});
// 访问127.0.0.1:3001查看效果
app.listen(3000);
console.log('server started on 127.0.0.1:3000');