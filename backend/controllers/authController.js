import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Usuario } from '../models/associations.js'

// REGISTRO
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const usuarioExistente = await Usuario.findOne({ where: { email } })
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El email ya está registrado' })
        }

        const usernameExistente = await Usuario.findOne({ where: { username } })
        if (usernameExistente) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const nuevoUsuario = await Usuario.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            usuario: {
                id: nuevoUsuario.id,
                username: nuevoUsuario.username,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        })

    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' })
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const usuario = await Usuario.findOne({ where: { email } })
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' })
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password)
        if (!passwordCorrecta) {
            return res.status(401).json({ error: 'Credenciales incorrectas' })
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({
            message: 'Login correcto',
            token,
            usuario: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email,
                rol: usuario.rol,
                avatar: usuario.avatar
            }
        })

    } catch (error) {
        console.error('Error login:', error)
        res.status(500).json({ error: error.message })
    }
}

export const me = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        })
        res.json(usuario)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' })
    }
}