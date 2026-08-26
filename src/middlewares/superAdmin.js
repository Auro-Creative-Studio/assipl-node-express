const normalizeRoleValue = (value) =>
    String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[\s-]+/g, "_");

const isSuperAdmin = (user) => {
    const roleType = normalizeRoleValue(user?.role?.type);
    const roleName = normalizeRoleValue(user?.role?.name);

    return roleType === "super_admin" || roleName === "super_admin";
};

const requireSuperAdmin = (req, res, next) => {
    if (!isSuperAdmin(req.user)) {
        return res.status(403).json({
            success: false,
            message: "Super admin access is required.",
        });
    }

    next();
};

module.exports = requireSuperAdmin;
module.exports.isSuperAdmin = isSuperAdmin;
