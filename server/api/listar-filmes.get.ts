import { Filme } from '~/server/models/filme.model';

export default defineEventHandler(async (event) => {
  try {
    const filmes = await Filme.find()
    return {
      filmes
    }
  } catch (error: any) {
    console.error(error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
    })
  }
})