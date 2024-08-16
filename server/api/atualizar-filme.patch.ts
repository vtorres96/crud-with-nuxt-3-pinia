import { Filme } from '~/server/models/filme.model';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await Filme.findByIdAndUpdate(body._id,{
    titulo: body.titulo,
    sinopse: body.sinopse
  })
  
  return body
})