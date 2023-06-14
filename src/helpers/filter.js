import cds from "../models/Cds.js";
import { notFoundFilter, notFoundFilterCust } from "./errors.js";

async function filtro(reqQuery) {
    const { album, ano, banda } = reqQuery
    let resultadoFiltro = {}
    
    if (album) {
      resultadoFiltro = await cds.find({'album':album})
    }    
    
    if (ano) {
        let anoNum = Number(ano)
        resultadoFiltro = await cds.find({'ano':anoNum})
    }
    
    if (banda){
      resultadoFiltro = await cds.find({'banda':banda})
    }
    
    if(!banda && !ano && !album){
      return notFoundFilter()
    }  
    return {resultadoFiltro}
    
  }

  export default filtro