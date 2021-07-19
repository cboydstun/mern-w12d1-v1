//import dependencies
import express from 'express'
import jwt from 'jsonwebtoken'
import validator from 'express-validator'

//initailize router
const router = express.Router()
const {check, validationResult} = validator;

//import models
import User from '../models/User.js'

//@GET - /api/todos - get all todos from database - Private

//@POST - /api/todos - create new todo - Private

//@PUT - /api/todos/:id - update todo - Private

//@DELETE - /api/todos/:id - delete todo - Private

export default router;