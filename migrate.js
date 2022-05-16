const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs');
const papa = require('papaparse');
const main_csv_path = 'server_files/laptop_price.csv';

const csvToJson = async(filepath) => {
    const fileData = fs.readFileSync(filepath).toString()
    return new Promise((resolve, reject) => {
        papa.parse(fileData, {
            header: true,
            complete: results => {
                console.log("Found" + results.data.length + " valid ")
            }
        })
    })
}

const fixColumns = (data) =>  data.map((obj) => {
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
            if (error) {
              console.log("Error" + error)
            } 
        })
    )
}