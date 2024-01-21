const mongoose = require('../database/index');
const bcryptjs = require("bcryptjs");
const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

loginSchema.pre("save", async function(next){
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
})

const user = mongoose.model("Login", loginSchema);

module.exports = user