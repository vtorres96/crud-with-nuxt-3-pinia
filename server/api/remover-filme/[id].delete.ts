import { Filme } from '~/server/models/filme.model';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const filmeRemovido = await Filme.findByIdAndDelete(id)
    return filmeRemovido
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID informado não é válido!',
    })
  }
})