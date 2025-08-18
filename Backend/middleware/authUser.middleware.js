import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    let token = req.headers.token || req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access - Token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id }; 

    // req.user = decoded.id;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token"
    });
  }
};

export default userAuth;
