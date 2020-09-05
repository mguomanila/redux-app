const http = require('http')
const path = require('path')
  
const credential = []
const port = 3000

const routes = {
  login: 'login',
  createuser: 'createuser'
}

const headers = [
  {'content-type': 'application/json'},
  {'content-type': 'text/plain'},
  {'Content-Type': 'text/html'},
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

const error_response = (req, res) => {
  res.writeHead(201, headers[1])
  res.end('error')
}

const ok_response = (req, res) => {
  res.writeHead(200, headers[0])
  res.end(JSON.stringify({
    msg: 'user successfully created',
    ok: true
  }))
}

const login_response = (req, res, index) => {
  res.writeHead(200, headers[0])
  res.end(JSON.stringify({
    session: {
      loggedIn: true,
    },
    users: [credential[index]],
  }))
}

const server = http.createServer((req, res) => {
  const lookup = path.basename(decodeURI(req.url))
  let data = ''
  
  req.on('data', chunk => {
    data += chunk.toString()
  })

  const createUser = (req, res) => {
    req.on('end', e => {
      const payload = JSON.parse(data)
      // todo: verification
      credential.push(payload)
      ok_response(req, res)
    })
  }
  
  const login = (req, res) => {
    req.on('end', e => {
      const v = parseReq(data) || parseUrl(lookup)
      const index = credential.findIndex(c => c.password === v.password && c.username === v.username)
      
      switch(index > -1){
        case true:
          login_response(req, res, index)
          break
        default:
        error_response(req, res)
      }
    })
  }

  // router
  switch(lookup.split('?')[0]){
    case routes.login:
      login(req, res)
      break
    case routes.createuser:
      createUser(req, res)
      break
    default:
      error_response(req, res)
  }
  
})

server.listen(port)
console.log('listening at port 3000...')
