const https = require('https')
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