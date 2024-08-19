import {connect} from "mongoose";

export default defineNitroPlugin(async(nitroApp)=>{
  try {
      const runtimeConfig = useRuntimeConfig()
      
      await connect(runtimeConfig.MONGO_URI)
      console.log('MONGO DB conectado!');
  } catch (error: any) {
    console.log(`Falha ao conectar-se ao banco, detalhes: ${error.message}`);
  }
})