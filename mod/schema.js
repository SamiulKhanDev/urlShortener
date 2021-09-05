const yup = require("yup");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    alias: {
        type: String,
        require: false,
 
    },
    url: {
        type: String,
        require: [true, "this field is required"],
    }
})


module.exports = mongoose.model("schema", schema);