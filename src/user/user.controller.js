'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const register = async(req, res) => {
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registrado satisfactoriamente'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al registrar el usuario'})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username: username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                lastname: user.lastname
            }
            let token = await generateJwt(loggedUser)
            return res.status(200).send(
                {
                    message: `Bienvenido ${loggedUser.username}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Credenciales invalidas'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error en el login'})
    }
}