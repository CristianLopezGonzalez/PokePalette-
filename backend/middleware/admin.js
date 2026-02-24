const adminMiddleware = (req, res, next) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Se requiere rol admin' })
    }
    next()
}

export default adminMiddleware