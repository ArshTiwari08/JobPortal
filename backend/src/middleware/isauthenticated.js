import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        // Verify JWT
        const decode = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        // Attach user ID to request
        req.id = decode.userID;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;