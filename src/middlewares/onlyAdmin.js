const onlyAdmin = (req, res, next) => {
    try {
        const isAdmin = req.user.role === "admin";
        if (isAdmin) {
            return next();
        }

        return res.status(403).json("Necesitas ser administrador para realizar esta acción")
    } catch (error) {
        return res.status(403).json("Necesitas ser administrador para realizar esta acción")
    }
};

module.exports = onlyAdmin;