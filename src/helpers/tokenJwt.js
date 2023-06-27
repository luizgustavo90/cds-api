import jwt from 'jsonwebtoken'
import {randomBytes} from 'crypto'

export let tokenRegistered = ''

async function createToken(name,depart,ra){

    const secretkey = randomBytes(64).toString('hex')

    const tokenCreated = jwt.sign(
        {
        name: name,
        department: depart,
        ra: ra
        },secretkey
    )

    tokenRegistered = tokenCreated
    return tokenCreated
}

export default createToken