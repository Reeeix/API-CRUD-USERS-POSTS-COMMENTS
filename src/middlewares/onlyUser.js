const onlyUser = (req, res, next) => {
    const isUser = req.user.role === "user";
    if (isUser) {
        next();
    } else if (!isUser) {
        res.status(403).json("Necesitas ser usuario para realizar esta acción")
    }
};

module.exports = onlyUser;