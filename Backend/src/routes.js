const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const servicePost = require('./services/servicePost')

const Post = require('./models/Post')

routes.get('/', async(req, res) => {

    return res.json({Hello: 'World'})
})


routes.get('/posts', async(req, res) => {
    const posts = await Post.find()

    return res.json(posts)
})

routes.post('/posts', multer(multerConfig).single('file'), async(req, res) => {

    const {originalname: name, size, key, location: url = '' } = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url,
    })
    //servicePost.receivePost()
    await servicePost.emitPost(post)
    return res.json(post)
})

routes.delete('/posts/:id', async(req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id)

    return res.send()
})


module.exports = routes