import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default adminAuth;
