const http = require('http')
const path = require('path')
  
// confidential
const credential = {
 username : 'admin',
 password : '123'
}

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
        if('username' in verify && 'password' in verify){
          if(verify['username'] == credential.username && verify['password'] == credential.password){
            res.writeHead(200, headers['200'])
            res.end(JSON.stringify({
              session: {
                loggedIn: true,
                name: credential.username,
              },
              users: [{
                username: 'marlon',
                id: 1
              }, {
                username: 'admin',
                id: 2
              }],
            }))
          } else {
            res.writeHead(201, headers['201'])
            res.end('error')
          }
        } else {
          res.writeHead(201, headers['201'])
          res.end('error')
        }
      })
    } else {
      res.writeHead(201, headers['201'])
      res.end('error')
    }
  })
})

server.listen(3000)
console.log('listening at port 3000...')
