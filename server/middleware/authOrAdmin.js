// middleware/authOrAdmin.js
export const authOrAdmin = (req, res, next) => {
    // Your authentication logic here
    if (req.isAuthenticated()) {
        return next();  // If authenticated, proceed
    }
    
    // Your admin check logic here
    if (req.user && req.user.role === 'admin') {
        return next();  // If admin, proceed
    }

    // If neither, return unauthorized
    return res.status(401).json({ message: "Unauthorized" });
};
