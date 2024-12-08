import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//hash the password while regiister
export let hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

//compare password while login
export let comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

//create token while login
export let createToken = async (_id, email, password) => {
    let token = await jwt.sign(
        { _id, email, password },
        process.env.JWT_SK,
        { expiresIn: process.env.JWT_EXPIRE }
    )
    return token;
};

//decode the token for fetch details
let decodeToken = async (token) => {
    return jwt.decode(token);
};

//validate the existing token
export let validate = async (req, res, next) => {
    try {
        let authHeader = await req?.headers?.authorization || req?.headers?.Authorization;
        if (authHeader) {
            let token = await authHeader.split(" ")[1];
            if (token) {
                let { exp } = await decodeToken(token);
                if ((Math.round((+new Date() / 1000))) < exp) {
                    next()
                } else {
                    res.status(400).json({ message: "Token has expired" });
                }
            } else {
                res.status(404).json({ message: "Token not found " });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//allows only admin to access further
export let admin = async (req, res, next) => {
    let token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
        let { role } = await decodeToken(token);
        if (role === "admin") {
            next()
        } else {
            res.status(400).json({ message: "Only admin can access" });
        }
    } else {
        res.status(400).json({ message: "Token not found" });
    }
}