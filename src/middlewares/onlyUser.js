const onlyUser = (req, res, next) => {
    try {
        const isUser = req.user.role === "user";
        if (isUser) {
            return next();
        }

        return res.status(403).json("Necesitas ser usuario para realizar esta acción")
    } catch (error) {
        return res.status(403).json("Necesitas ser usuario para realizar esta acción")
    }
};

module.exports = onlyUser;