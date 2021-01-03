import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import valid from "../../../utils/valid";

connectDB()

export default async (req, res) => {
    debugger;
    switch(req.method) {
        case 'POST':
            await login(req, res)
            break
    }
}

const login = async (req, res) => {
    debugger;
    try {
        const { email, password } = JSON.parse(req.body)
        const errMsg = valid(name, email, password, cf_password)
        if(errMsg) return res.status(400).json({err: errMsg})

        const user = await Users.findOne({ email })
        if(!user) return res.status(400).json({err: 'This user does not exists.'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ err: 'Incorrect password.' })

        await newUser.save()

        res.json({msg: 'Register success!'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
