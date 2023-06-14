import cds from "../models/Cds.js";
import { notFoundFilter } from "./errors.js";

async function filtro(reqQuery) {
    const { album, ano, banda } = reqQuery
    console.log(album,ano,banda)
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
    } else {
      return notFoundFilter()
    }    
  
    return {
      resultadoFiltro,
    }
  }

  export default filtro