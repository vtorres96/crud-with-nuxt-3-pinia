import { Filme } from '~/server/models/filme.model';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  try {
    const filmeRemovido = await Filme.findByIdAndDelete(id)
    return filmeRemovido
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID informado não é válido!',
    })
  }
})