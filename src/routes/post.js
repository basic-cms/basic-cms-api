'use strict'

const express = require('express')
const { users, posts } = require('../models/index')
const postRouter = express.Router()

const { acl , bearer } = require('../middleware/auth')

postRouter.get('/posts', handleGetAll)
postRouter.get('/posts/:userId', handleGetAllByUser)
postRouter.get('/post/:id', handleGetOne)
postRouter.post('/post', bearer(users), acl('create'), handleCreate)
postRouter.put('/post/:id', bearer(users), acl('update'), handleUpdate)
postRouter.delete('/post/:id',bearer(users), acl('delete'), handleDelete)

// GET All Posts if auth || no-auth
async function handleGetAll(req, res){
  try{
    let allPosts = await posts.findAll()
    res.status(200).json(allPosts)
  }catch(e){
    console.error(e.message)
  }
}
// POST 1 Post  if >=User only
async function handleCreate(req, res, next){
  try{
    req.post = req.body
    req.post.user_id = req.user.id
    let newPost = await posts.create(req.post)
    res.status(200).json(newPost)
  }catch(e){
    console.error(e.message)
  } finally {
    next()
  }
}

// GET 1 Post   if >=Writer
async function handleGetOne(req, res){
  try{
    let postId = ~~req.params.id
    let getPost = await posts.findByPk(postId)
    res.status(200).json(getPost)
  }catch(e){
    console.error(e.message)
  }
}

// Get All Post By User
async function handleGetAllByUser(req, res) {
  try{
    let userId = ~~req.params.userId
    let retrievedPosts = await posts.findAll({ where: { user_id: userId }} )
    res.status(200).json(retrievedPosts)
  }catch(e) {
    console.error(e.message)
  }
}

// PUT 1 Post   if >=Editor
async function handleUpdate(req, res){
  try{
    let updatedPost = await posts.update(req.body, { where: {id: ~~req.params.id} })
    // why returns arr with single val === 1?
    res.status(200).json(updatedPost)
  }catch(e){
    console.error(e.message)
  }
}
// DEL 1 Post   if = Admin only
async function handleDelete(req, res){
  try{
    let deletedPost = await posts.destroy({ where:{id: ~~req.params.id} })
    res.status(200).json(deletedPost)
  }catch(e){
    console.error(e.message)
  }
}

module.exports = postRouter
