const onlyAdmin = (req, res, next) => {
    const isAdmin = req.user.role === "admin";
    if (isAdmin) {
        next();
    } else if (!isAdmin) {
        res.status(403).json("Necesitas ser administrador para realizar esta acción")
    }
};

module.exports = onlyAdmin;