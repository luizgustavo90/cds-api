import createToken from "../helpers/tokenJwt.js";
import { returnModelErr, returnModelToken } from "../helpers/return.js";

class AutenticarController {
    static autenticaUsuario = async(req, res) => {
        try {
            const { nome, departamento, ra } = req.body
            const token = await createToken(nome,departamento,ra)
            return returnModelToken(res,token)
        }
        catch(err){
            return returnModelErr(res,err)
        }        
    }
}

export default AutenticarController