import { defineStore } from "pinia";


interface IState{
  filmes: IFilme[],
  filmeAtual: IFilme | null
}

export const useFilmeStore = defineStore('filmes', {
  state: ():IState=>({
    filmes: [],
    filmeAtual: null
  }),
  actions: {
    async obterFilmes(){
      const {data, error} = await useFetch('/api/listar-filmes')
      this.filmes = (data.value as any).filmes      
    },
    async cadastrar(body:{titulo: string, sinopse: string}){
      const {data, error} = await useFetch('/api/cadastrar-filme',{
        method: 'POST',
        body
      })
    },
    async atualizar(body:IFilme){
      const {data, error} = await useFetch('/api/atualizar-filme',{
        method: 'PATCH',
        body
      })
    },
    async remover(id:string){
      const {data, error} = await useFetch(`/api/remover-filme/${id}`,{
        method: 'DELETE'
      })
      this.filmes = this.filmes.filter(x => x._id !== id) 
    },
    setFilmeAtual(filme:IFilme | null){
      this.filmeAtual = filme
    }
  }
})
