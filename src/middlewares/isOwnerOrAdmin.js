const isOwnerOrAdmin = (Model) => async (req, res, next) => {
  try {
    const resource = await Model.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }

    const isAdmin = req.user.role === "admin";

    const ownerId = resource.author ? resource.author : resource._id;

    const isOwner = ownerId.toString() === req.user._id.toString();
   
    if (isOwner || isAdmin) {
      return next();
    }
    return res.status(403).json({ error: "No autorizado" });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = isOwnerOrAdmin;