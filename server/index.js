// node 版本v9+ http2访问不成功，（启动不报错，但是在浏览器访问不到）
const https = require('https')
const http2 = require('http2')
const fs = require('fs')
const path = require('path')
const resolve = (dir) => path.join(__dirname, '..' , dir)
const options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certification.pem'),
  //ca: fs.readFileSync('./SSL/root_bundle.crt')    //这个线上环境需要
}

 const app = https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('hello world\n')
})

app.listen('8001', '0.0.0.0', () => {
  console.log('HTTPS Server running at https://0.0.0.0');
})

 const http2App = http2.createServer(options, (req, res) => {
  res.writeHead(200)
   const postData = JSON.stringify({
    data: {
      list: [{name: '冰冰', age: 16, sex: '女'}, {
        name: '华仔', age: 56, sex: '男'
      }],
      total: 2
    },
    code: 200,
    message: '获取用户信息成功'
  })
  // res.write(postData)
  res.end('hello http2\n')
})

http2App.listen('8002', '0.0.0.0', () => {
  console.log('HTTP2 Server running at https://0.0.0.0');
})
