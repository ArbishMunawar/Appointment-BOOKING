import jwt from "jsonwebtoken";

const doctorAuth = (req, res, next) => {
  try {
    let dToken = req.headers.dtoken || req.headers.dToken || req.headers.authorization;

    if (dToken && dToken.startsWith("Bearer ")) {
      dToken = dToken.split(" ")[1];
    }

    if (!dToken) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access - Token missing"
      });
    }

    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);

    req.docId = decoded.id; 
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token expired" });
    }
    return res.status(401).json({
      success: false,
      error: "Invalid token"
    });
  }
};

export default doctorAuth;
