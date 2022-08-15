import { NextFunction, Request, Response } from "express";
import { addHeadersToResponse } from "./server-helpers";
import sequelize from './util/database';
import { User } from './models/users';
import { jwtInfo } from "./util/jwtInfo";
const jwt = require("jsonwebtoken");

export async function findUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.params;
        if (!name) {
            res.status(400).send({
                message: 'Please provide all the fields.'
            });
            return;
        }
        const user = await User.findOne({ where: { name } });
        if (!user) {
            res.status(404).send({
                message: `User ${name} not found`
            });
            return;
        }
        return res.header('Access-Control-Allow-Headers', '*').header('Access-Control-Allow-Origin', '*').status(200).json(user);
    }
    catch (ex) {
        throw ex;
    }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
        return;
    }

    // Create the User Record
    let newUser = {
        email: req.body.email,
        password: req.body.password
    }

    newUser = await User.create(newUser);

    if (!newUser) {
        res.status(400).send({
            message: 'Error while creating user.'
        });
        return;
    }

    return res.status(200).json(newUser);
}

export async function login(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Please provide email and password.'
        });
        return;
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(user instanceof User)) {
        res.status(403).send({
            message: "User does not exist!"
        });
        return;
    } else {
        if (user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Login Successful",
                token: jwt.sign({ email: user.email, group: user.group }, jwtInfo.secret)
            });
            return;
        } else {
            res.status(403).send({
                message: "Invalid Credentials!"
            });
            return;
        }
    }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email) {
        res.status(400).send({
            message: 'Please provide email.'
        });
        return;
    }
    if (!req.body.oldPassword || !req.body.newPassword) {
        res.status(400).send({
            message: 'Please provide both old and new password.'
        });
        return;
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(user instanceof User)) {
        res.status(403).send({
            message: "User does not exist!"
        });
        return;
    } else {
        if (user.verifyPassword(req.body.oldPassword)) {
            user.update({ password: req.body.newPassword }, {
                where: { id: user.id }
            });
            res.status(200).send({
                message: "Password Updated Successfully!"
            });
        } else {
            res.status(403).send({
                message: "Invalid Old Password! Please recheck."
            });
        }
    }
}

export async function verifyPassword(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email) {
        res.status(400).send({
            message: 'Please provide email.'
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: 'Please provide your password to re-authenticate.'
        });
        return;
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if (user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Password Verification Successful!"
            })
        } else {
            res.status(403).send({
                message: "Invalid Password! Please recheck."
            });
        }
    }
}

function next() {
    throw new Error("Function not implemented.");
}
