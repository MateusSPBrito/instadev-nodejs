const { decryptedToken } = require('../../utils/token')
const { dencrypt } = require('../../utils/cripty')

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'Token ausente!' })
    try {
        const { newId } = await decryptedToken(authHeader)
        req.newId = parseInt(dencrypt(newId))
        return next()
    } catch (error) {
        return res.status(401).json({ message: 'Não autorizado!' })
    }
}

module.exports = verifyJwt