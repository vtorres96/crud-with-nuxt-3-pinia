import { Filme } from '~/server/models/filme.model';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filmeCreada = await Filme.create({
    titulo: body.titulo,
    sinopse: body.sinopse
  })
  
  return filmeCreada
})