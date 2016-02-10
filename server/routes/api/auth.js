"use strict";

const authRouter = require("express").Router();

const AuthController = require("../../controllers/auth");

authRouter.post("/auth", AuthController.authorize);

module.exports = authRouter;
