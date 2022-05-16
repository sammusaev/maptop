const express   = require("express");
const Laptop    = require("./Laptop");
const path      = require("path")
const router    = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname+"/public/index.html"));
})

router.get('/favorites', async (req, res) => {
    res.sendFile(path.join(__dirname+"/public/favorites.html"));
})

router.get("/laptops", async (req, res) => { 
    const laptops = await Laptop.find();
    res.send(laptops);
});

router.get("/health", async (req, res) => {
    res.send('{"foo": 1}')
})

router.get('/find', async (req, res) => {
    res.sendFile(path.join(__dirname+"/public/find.html"));
})

router.get('/uniqueCompanies', async (req, res) => {
    const allCompanies = await Laptop.distinct('Company')
    res.send(allCompanies)
})

module.exports = router;