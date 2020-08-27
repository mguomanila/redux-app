const http = require('http')
const path = require('path')
  
// confidential
const username = 'admin'
const password = '123'

// routers
const pages = [
  {route: 'users', title: 'users account'}
]

// returns an array of key, value pairs
const parseReq = str => {
  const data = {}
  str.split('&&').forEach(tokens => {
    const [key, val] = tokens.split('=')
    data[key] = val
  })
  return ('username' in data) ? data : ''
}

const parseUrl = str => {
  const data = {}
  str.split('?')[1].split('&').forEach(tokens => {
    const [key, val] = tokens.split('=')
    data[key] = val
  })
  return ('username' in data) ? data : ''
}

const headers = {
  '200': {'content-type': 'application/json'},
  '201': {'content-type': 'text/plain'},
  '100': {'Content-Type': 'text/html'}
}
  
const server = http.createServer((req, res) => {
  const lookup = path.basename(decodeURI(req.url))
  pages.forEach(page => {
    if(lookup.includes(page.route)){
      let data = ''
      req.on('data', chunk => {
        data += chunk.toString()
      })
      req.on('end', e => {
        let verify = parseReq(data)
        verify = verify ? verify : parseUrl(lookup)
        console.log(verify)
        if('username' in verify && 'password' in verify){
          if(verify['username'] == username && verify['password'] == password){
            res.writeHead(200, headers['200'])
            res.end(JSON.stringify({
              loggedIn: true,
              message: 'test'
            }))
            console.log({ok:true})
          } else {
            res.writeHead(201, headers['200'])
            res.end('verify error')
          }
        } else {
          res.writeHead(201, headers['100'])
          res.end('wrong query')
        }
      })
    }
  })
})

server.listen(3000)
console.log('listening at port 3000...')