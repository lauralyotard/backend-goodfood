import * as express from "express";
import { json } from "body-parser";

import { initDb } from "./initialization";

import { NextFunction, Request, Response } from "express";

import { findUserByEmail, signup, login, changePassword, verifyPassword } from './local-user';
import { getAllPizzas } from './local-restaurant';
import sequelize from './util/database';

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// App handlers
const app = express();
const parser = json();

const addControlAllowHeader = (request: Request, response: Response, next: NextFunction) => {
  response.header("Access-Control-Allow-Headers", '*')
  response.header("Access-Control-Allow-Origin", '*')
  next();
}

app.get("/", (req: any, res: any) => {
  res.status(200).send("hello world!");
});

app.get("/ping", (req: any, res: any) => {
  res.status(200).send("pong");
});

app.get("/healthy", (req: any, res: any) => {
  res.status(200).send("healthy");
});

app.get('/users', parser, findUserByEmail);
app.post('/users/signup', parser, signup);
app.post('/users/login', parser, login);
app.put('/users/password', parser, changePassword);
app.post('/users/verify', parser, verifyPassword);

app.get('/restaurant/:id/pizzas', parser, getAllPizzas);

app.use(addControlAllowHeader);

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

initDb(app);