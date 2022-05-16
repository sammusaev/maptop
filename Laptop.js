const mongoose = require("mongoose");

const schema = mongoose.Schema({
    Number:             Number, // {type: Number, default: 1},
    Company:            String,
    Product:            String,
    Type:               String,
    Inches:             Number,
    ScreenResolution:   String,
    CPU:                String,
    RAM_GB:             String,
    DiskSpace:          String,
    GPU:                String,
    OpSys:              String,
    Weight_kg:          Number,
    Price_RM:           Number,
});

module.exports = mongoose.model("Laptop", schema);