import { Filme } from '~/server/models/filme.model';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    await Filme.findByIdAndUpdate(body._id,{
      titulo: body.titulo,
      sinopse: body.sinopse
    })
    
    return body 
  } catch (error: any) {
    console.error(error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
    })
  }
})