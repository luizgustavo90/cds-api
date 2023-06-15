import cds from "../models/Cds.js";
import { notFoundFilter, notFoundFilterCust } from "./errors.js";

async function filtro(reqQuery) {
    const { album, ano, banda } = reqQuery
    let resultadoFiltro = {}
    
    if (album) {
     resultadoFiltro = await cds.find({'album': {$regex: album, $options: 'i'}})
    }    
    
    else if (ano) {
        let anoNum = Number(ano)
        resultadoFiltro = await cds.find({'ano':anoNum})
    }
    
    else if (banda){
      resultadoFiltro = await cds.find({'banda':{$regex: banda, $options: 'i'}})
    }
    
    if(!banda && !ano && !album){
      return notFoundFilter()
    }
    
    return {resultadoFiltro}
    
  }

  export default filtro