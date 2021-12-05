const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index'); //me manda al archivo index.hbs
});

router.get("/about", (req, res) => {
    res.render('about'); //me manda al archivo about.hbs
});

module.exports = router;


//router.get('/', (req,res) => {
//    res.send('hello word')
//});

//module.exports = router;

//aqui puse el nuevo codigo


//const router = Router();

//router.get("/", renderIndex);
//router.get("/about", renderAbout);

//export default router;