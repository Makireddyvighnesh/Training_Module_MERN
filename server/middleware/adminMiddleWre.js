import User from "../model/userModel.js";

const adminMiddleware = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        const user = await User.findById(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next(); 
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export default adminMiddleware;
