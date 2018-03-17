## Nodejs创建https服务器(Windows 10/7)

**搭建https步骤:**

- 1. 生成 OpenSSL证书
- 2. 使用Nodejs的https模块建立服务器

### OpenSSL证书（需要安装git或者Cygwin等含有linux环境工具）（以下操作都是在项目根目录下）

- 1. 生成私钥key文件

```shell

openssl genrsa -out privatekey.pem 1024

```

- 2. 通过私钥生成CSR证书签名

```shell

openssl req -new -key privatekey.pem -out certrequest.csr

```

- 3. 通过私钥和证书签名生成证书文件

```shell

openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certification.pem

```

### Nodejs https 服务器示例

```js

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

```

在浏览器中输入: `https://localhost:8001`。

**注意**:

node>=9.0， http2服务无法使用...

**参考地址:**
1. [Nodejs创建https服务器(Windows 7)](http://blog.csdn.net/foruok/article/details/52993948)
