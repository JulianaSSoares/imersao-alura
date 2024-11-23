import 'dotenv/config'
import { ObjectId } from 'mongodb'
import conectarAoBanco from '../config/dbConfig.js'

// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

export async function getTodosPosts() {
  // Seleciona o banco de dados 'imersao_instabyte' e a coleção 'posts'
  const db = conexao.db('imersao_instabyte')
  const colecao = db.collection('posts')

  // Executa uma consulta para encontrar todos os documentos na coleção e retorna um array com os resultados
  return colecao.find().toArray()
}

export async function criarPost(novoPost) {
  const db = conexao.db('imersao_instabyte')
  const colecao = db.collection('posts')
  return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db('imersao_instabyte')
  const colecao = db.collection('posts')
  const objId = ObjectId.createFromHexString(id)
  return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: novoPost })
}
