const http = require('http')
const fs = require('fs')
const path = require('path')
const { getContentType, getHostIP } = require('./utils')

const PORT = 5500
const hostIP = getHostIP()
const public_dir = 'public'

const get = (req, res) => {
  let filePath = fixPath(req.url)
  let contentType = getContentType(path.extname(filePath || ''))
  let fileContent = filePath ? fs.readFileSync(filePath) : '<h1>Ошибка</h1>'
  res.setHeader('Content-Type', contentType)
  res.end(fileContent)
}

const post = (req, res) => {}

const fixPath = (pathName) => {
  if (pathName.startsWith('/')) {
    pathName = pathName.slice(1)
  }
  if (pathName === '') {
    return path.resolve(public_dir, 'index.html')
  }

  pathName = path.resolve(public_dir, pathName)
  if (fs.existsSync(pathName)) {
    return pathName
  }
  return false
}

http
  .createServer((req, res) => {
    switch (req.method) {
      case 'GET':
        get(req, res)
        break
      case 'POST':
        post(req, res)
        break
    }
  })
  .listen(PORT, () => {
    console.log('\nАдрес в локальной сети: ', `http://${hostIP}:${PORT}\n`)
    console.log('Адрес на этом компьютере: ', `http://localhost:${PORT}\n`)
  })
