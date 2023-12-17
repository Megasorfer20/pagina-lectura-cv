import { ObjectId } from "mongodb";
import bcryptjs from "bcryptjs"
import { conection, client } from "../database/dbconection.js";

const loginFunction = async (req, res) => {
    try {
        const {email, password} = req.body

        const usersDB = (await conection()).users;
        const users = await usersDB.findOne({ email: email}).toArray();

        if(!users){
            return res.status(404).json({
                meggase: "Usuario no econtrado"
            })
        }

        if(!users.status){
            return res.status(404).json({
                meggase: "Usuario Inactivo"
            })
        }

        const validPassword = bcryptjs.compareSync(password, users.password)
        if(!validPassword){
            return res.status(404).json({
                meggase: "Contraseña Incorrecta"
            })
        }

    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

export default loginFunction