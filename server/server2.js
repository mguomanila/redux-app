const express = require('express')
const app = express()

const port = process.env.PROXY_PORT || 3000
const credential = []
const posts = [
{
  postId: 1,
  msg: 'this is test message'
}
]

// routers middleware!
function error(res, msg='', id=404){
  res.status(id).send(msg)
}

// login 
function login(req, res, next){
  const u = req.body
  const index = credential.findIndex(c => c.password === u.password && c.username === u.username)
    
  if(index > -1){
    const user_list = credential.map(user => ({
      userId: user.userId,
      username: user.username,
      blogName: user.blogName,
      image: user.image
    }))

    res
    .status(200)
    .type('json')
    .send({
      session: credential[index],
      users: user_list,
    })
  } else{
    error(res, 'something wrong')
  }
}

function createuser(req, res, next){
  const payload = req.body
  
  if(payload.userId){
    // todo: verification
    credential.push(payload)

    res
    .status(200)
    .type('json')
    .send({
      msg: 'user successfully created',
      ok: true
    })
    console.log(
      payload.userId,
      payload.username, 
      payload.password
    )
  } else {
    error(res, 'something wrong')
  }
}

function posts_post(req, res, next){
  const post = req.body
  if(post.id && post.msg){
    posts.push(post)
    res.json({msg: 'success'})
  } else {
    error(res, 'posting error')
  }
}

function post_get(req, res, next){
  const query = req.query
  if(query.id){
    const index = posts.findIndex( post => query.id === post.id)
    res.json(posts[index])
  } else {
    // todo: check credential later
    res.json(posts)
  }
}

app.use(express.json({
  limit: "100mb"
}))
app.post('/api/login', login)
app.post('/api/createuser', createuser)
app.get('/api/posts', post_get)
app.post('/api/posts', posts_post)
app.put('/api/posts', posts_post)

app.listen(port)
console.log('express server listening in port ' + port)
