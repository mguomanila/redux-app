const http = require('http')
const path = require('path')

const port = 3000
const credential = []
const posts = []

const routes = {
  login: 'login',
  createuser: 'createuser',
  posts: 'posts'
}

const headers = [
  {'content-type': 'application/json'},
  {'content-type': 'text/plain'},
  {'Content-Type': 'text/html'},
]
 
// private modules
const err_resp = (req, res) => {
  res.writeHead(201, headers[1])
  res.end('error')
}

const ok_resp = (req, res) => {
  res.writeHead(200, headers[0])
  res.end(JSON.stringify({
    msg: 'user successfully created',
    ok: true
  }))
}

const login_resp = (req, res, index) => {
  const user_list = credential.map(user => ({
    userId: user.userId,
    username: user.username,
    blogName: user.blogName,
    image: user.image
  }))
  res.writeHead(200, headers[0])
  res.end(JSON.stringify({
    session: credential[index],
    users: user_list,
  }))
}

// server
const server = http.createServer((req, res) => {
  const lookup = path.basename(decodeURI(req.url))
  let data = ''
  
  req.on('data', chunk => {
    data += chunk.toString()
  })

  const createUser = (req, res) => {
    req.on('end', () => {
      const payload = JSON.parse(data)
      // todo: verification
      credential.push(payload)
      ok_resp(req, res)
      console.log(
        payload.userId,
        payload.username, 
        payload.password
      )
    })
  }
  
  const login = (req, res) => {
    req.on('end', () => {
      const v = JSON.parse(data)
      const index = credential.findIndex(c => c.password === v.password && c.username === v.username)
      
      if(index > -1)
        login_resp(req, res, index)
      else
        err_resp(req, res)
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
    case routes.posts:
      createUser(req, res)
      break
    default:
      err_resp(req, res)
  }
  
})

server.listen(port)
console.log('listening at port 3000...')
