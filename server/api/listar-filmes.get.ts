import { Filme } from '~/server/models/filme.model';

export default defineEventHandler(async (event) => {
  // const body = await readBody(event)
  // return { body }
  return {
    filmes: await Filme.find()
  }
})