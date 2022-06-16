const os = require('os')

const getContentType = (extension) => {
  switch (extension) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
    case '.jpeg':
      contentType = 'image/jpg'
      break
    case '.wav':
      contentType = 'audio/wav'
      break
    case '.ico':
      contentType = 'image/x-icon'
      break
    default:
      contentType = 'text/html; charset=utf-8'
  }
  return contentType
}

const getHostIP = () => {
  const networkInterfaces = os.networkInterfaces()
  let ipAddress = 'неизвестно'
  for (key in networkInterfaces) {
    for (block of networkInterfaces[key]) {
      if (block.address.startsWith('192.')) {
        ipAddress = block.address
      }
    }
  }
  return ipAddress
}

module.exports = { getContentType, getHostIP }
