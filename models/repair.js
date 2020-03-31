var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var RepairSchema = new mongoose.Schema({

    phone:Number,
    first:String,
    last:String,
    brand:String,
    model:String,
    repairs:String,

    // isAdmin: {type: Boolean, default: false}
});

// RepairSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Repair", RepairSchema);