const Users = require('../models/Users')
const bcryptjs = require('bcryptjs')

class UserController {
    async create(req, res) {
        const verifyUser = await Users.findOne({
            where: {
                email: req.body.email,
            },
        })
        if (verifyUser) return res.status(400).json({ message: 'Email já cadastrado!' })

        const user = await Users.create(req.body)
        if (!user) return res.status(400).json({ message: 'Falha ao criar novo usuário!' })
        return res.send({ user })
    }

    async update(req, res) {
        const {
            name,
            avatar,
            bio,
            gender,
            old_password,
            new_password,
            confirm_new_password,
        } = req.body

        const user = await Users.findOne({ where: { id: req.userId } })

        if (!user) return res.status(401).json({ message: 'Usuário não encontrado!' })

        let encryptedPassword
        if (old_password) {
            if (!await user.checkPassword(old_password))
                return res.status(401).json({ message: 'Senha antiga incorreta!' })
            if (!new_password) return res.status(401).json({ message: 'Nova senha não informada' })
            if (!confirm_new_password) return res.status(401).json({ message: 'Confirmação da nova senha não informada' })
            if (new_password !== confirm_new_password) return res.status(401).json({ message: 'As senhas não são iguais' })

            encryptedPassword = await bcryptjs.hash(new_password, 8)
        }

        await Users.update(
            {
                name: name || user.name,
                avatar: avatar || user.avatar,
                bio: bio || user.bio,
                gender: gender || user.gender,
                password_hash: encryptedPassword || user.password_hash,
            },
            {
                where: {
                    id: user.id
                }
            }
        )

        return res.status(200).json({ message: 'Usuário atualizado!' })
    }
}

module.exports = new UserController()