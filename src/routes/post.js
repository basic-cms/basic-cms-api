'use strict'

const express = require('express')
const { users, posts } = require('../models/index')
const postRouter = express.Router()

const { acl , bearer } = require('../middleware/auth')

postRouter.get('/post', handleGetAll)
postRouter.get('/post/:id', bearer(users), handleGetOne)
postRouter.post('/post',bearer(users), acl('create'), handleCreate)
postRouter.put('/post/:id',bearer(users), acl('update'), handleUpdate)
postRouter.delete('/post/:id',bearer(users), acl('delete'), handleDelete)

// GET All Posts if auth || no-auth
async function handleGetAll(req,res,next){
  try{
    let allPosts = await posts.findAll()
    res.status(200).json(allPosts)
  }catch(e){
    console.error(e.message)
  }
}
// POST 1 Post  if >=User only
async function handleCreate(req,res,next){
  try{
    req.post = req.body
    let newPost = await posts.create(req.post)
    res.status(200).json(newPost)
  }catch(e){
    console.error(e.message)
  }
}
// GET 1 Post   if >=Writer
async function handleGetOne(req,res,next){
  try{
    postId = parseInt(req.params.id)
    let getPost = await posts.findByPk(postId)
    res.status(200).json(getPost)
  }catch(e){
    console.error(e.message)
  }
}
// PUT 1 Post   if >=Editor
async function handleUpdate(req,res,next){
  try{
    let updatedPost = await posts.update(req.body ,{ where:{id:parseInt(req.params.id)}} )
    // why returns arr with single val === 1?
    res.status(200).json(updatedPost)
  }catch(e){
    console.error(e.message)
  }
}
// DEL 1 Post   if = Admin only
async function handleDelete(req,res,next){
  try{
    let deletedPost = await posts.destroy({ where:{id:parseInt(req.params.id)}} )
    res.status(200).json(deletedPost)
  }catch(e){
    console.error(e.message)
  }
}

module.exports = postRouter
