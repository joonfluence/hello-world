import express from "express";

const globalRouter = express.Router();

globalRouter.post("/join", postJoin, postLogin);
globalRouter.post("/login", postLogin);
