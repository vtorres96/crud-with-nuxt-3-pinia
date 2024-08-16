import {Schema, model} from "mongoose";

const FilmeSchema = new Schema({
  titulo: String,
  sinopse: String
})

export const Filme = model('filmes', FilmeSchema)