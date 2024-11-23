import express from 'express'
import multer from 'multer'
import {
  listarPosts,
  postarNovoPost,
  uploadImage,
  atualizarNovoPost
} from '../Controllers/postsController.js'
import cors from 'cors'

const corsOption = {
  origin: 'http://localhost:8000',
  optionSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ dest: './uploads', storage })

const routes = app => {
  //Permite que o servidor interprete requisições
  app.use(express.json())
  app.use(cors(corsOption))
  // Rota GET para obter todos os posts
  app.get('/posts', listarPosts)
  app.post('/posts', postarNovoPost)
  app.post('/upload', upload.single('imagem'), uploadImage)

  app.put('/upload/:id', atualizarNovoPost)
}

export default routes
