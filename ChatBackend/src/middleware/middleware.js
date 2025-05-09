import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const authMiddleware = async(req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOkEN);
    req.user = decoded; // example: { userId: 'abc123', iat: ..., exp: ... }
    const user=await User.findById(decoded.userId).select("-password");
    if (!user) {

      res.status(401).json({message:"No user found"})
    }
    req.user=user
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
