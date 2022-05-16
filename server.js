const express   = require("express")
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs');
const papa = require('papaparse');
const routes = require('./routes');
const PORT      = process.env.PORT || 5000; 
const CSV_PATH = './server_files/laptop_price.csv';
const Laptop = require('./Laptop');

const csvToJson = async(filepath) => {
    const fileData = fs.readFileSync(filepath).toString()
    return new Promise((resolve, reject) => {
        papa.parse(fileData, {
            header: true,
            complete: results => {
                console.log("Found " + results.data.length + " valid entries")
                resolve(results.data) 
            }
        })
    })
}

const fixColumns = (data) => data.map((obj) => {
    return {
        Number: parseInt(obj.laptop_ID), // Keeping this to check for duplicates 
        Company: obj.Company,
        Product: obj.Product,
        Type: obj.TypeName,
        Inches: parseFloat(obj.Inches).toFixed(2),
        ScreenResolution: obj.ScreenResolution, 
        CPU: obj.Cpu, 
        RAM_GB: parseInt(obj.Ram),
        DiskSpace: obj.Memory,
        GPU: obj.Gpu,
        OpSys: obj.OpSys, 
        Weight_kg: parseFloat(obj.Weight).toFixed(2), 
        Price_RM: (parseFloat(obj.Price_euros) * 4.6).toFixed(2) // Lol you probably wanna do something better
    }
})

const insertJsonIntoDB = (data) => {
    // to ensure duplicates aren't inserted
    // we update & upsert, and reference the unique Number column
    data.map((obj) => Laptop.findOneAndUpdate(
        {'Number': obj.Number}, obj, { upsert: true },
          (error) => {
            if (error) console.log("Failed to insert JSON data into DB: " + error + "\t" + obj.Company)
        })
    )
}

// Generic piping function
const migrationCurry = async (filepath) => {
    console.log("Starting migration...")
    csvToJson(filepath).then((json_data) => {
        insertJsonIntoDB(fixColumns(json_data))
    }).catch((e) => console.log("Migration failed: " + e));
}

mongoose
    .connect("mongodb://127.0.0.1:27017/db", {useNewUrlParser: true})
    .then(() => {
        const app = express();
        app.use(express.static(path.join(__dirname, "server_files")));
        app.use('/', routes)
        app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
        migrationCurry(CSV_PATH)
    })

// app.get("/backend", (req, res) => {
//     res.send("DOODOO");
// });