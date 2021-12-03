//const { Router } = require('express');
//const { modelNames } = require('mongoose');
//const router = Router()

//router.get('/', (req,res) => {
//    res.send('hello word')
//});

//module.exports = router;

//aqui puse el nuevo codigo


import { Router } from "express";
import { renderIndex, renderAbout } from "../controllers/index.controller";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);

export default router;