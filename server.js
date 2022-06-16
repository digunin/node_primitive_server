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

const post = (req, res) => {
  let ext = req.url.slice(1)
  let chunks = []
  let len = 0
  req.on('data', (data) => {
    len += data.length
    chunks.push(data)
  })
  req.on('end', () => {
    const image = Buffer.concat(chunks, len)
    let [savedName, srcName] = getSavedName(ext)
    fs.writeFile(savedName, image, 'binary', (err) => {
      if (err) {
        console.log('error')
      } else {
        console.log('saved')
      }
    })
    res.setHeader('Content-Type', 'text/plain')
    res.end(srcName)
  })
}

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

const getSavedName = (ext) => {
  let images_dir = 'images'
  let name = 'random_file'
  return [
    path.resolve(public_dir, images_dir, `${name}.${ext}`),
    `${images_dir}\\${name}.${ext}`,
  ]
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
