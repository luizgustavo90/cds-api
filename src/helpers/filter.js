import bandas from "../models/Bandas.js";
import cds from "../models/Cds.js";
import { notFoundFilter} from "./errors.js";

async function filtroCd(reqQuery) {
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

  async function filtroBanda(reqQuery) {
    const { banda } = reqQuery
    let resultadoFiltro = {}
      
    if (banda){
      resultadoFiltro = await bandas.find({'banda':{$regex: banda, $options: 'i'}})
    }
    
    if(!banda){
      return notFoundFilter()
    }
    
    return {resultadoFiltro}
    
  }

  export {filtroCd, filtroBanda}