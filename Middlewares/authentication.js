import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export let hashPassword = async (password) => {
    //generating the slat with genSalt method
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export let comparePassword = async (password, hashedPassword) => {
    //compare the password using bcrypt
    return await bcrypt.compare(password, hashedPassword);
};

export let createToken = async (email, password, _id) => {
    //create token based on these fields
    let token = await jwt.sign(
        { email, password, _id },
        process.env.JWT_SK,
        { expiresIn: process.env.JWT_EXPIRE }
    )
    return token;
};


let decodeToken = async (token) => {
    return jwt.decode(token);
}

//we create token
export let validate = async (req, res, next) => {
    try {
        //find a token in headres
        let token = req?.headers?.authorization?.split(" ")[1]
        if (token) {
            let { exp } = await decodeToken(token);
            //if token found we can calculate the seconds and it returns always in millisecond so we can convet seconds
            if (Math.round((+new Date() / 1000)) < exp) {
                next();
            } else {
                res.status(400).json({ message: "Token has expired" });
            }
        } else {
            res.status(404).json({ message: "Token not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//we define only admin can access
export let admin = async (req, res, next) => {
    try {
        //we can find a token in headers
        let authHeader = await req?.headers?.authorization || req?.headers?.Authorization;

        let token = await authHeader.split(" ")[1];

        if (token) {
            let { role } = await decodeToken(token);
            if (role === "admin") {
                next();
            } else {
                res.status(400).json({ message: "Only admin can access" });
            }
        } else {
            res.status(404).json({ message: "Token not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};
