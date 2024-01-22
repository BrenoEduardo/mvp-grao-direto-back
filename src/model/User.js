const mongoose = require('../database/index');
const bcryptjs = require("bcryptjs");

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: function() {
            return this.typeAccount === 'client';
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    typeAccount: {
        type: String,
        required: true,
        enum: ['client', 'colaborator']
    },
    nameCompany: {
        type: String,
        required: function() {
            return this.typeAccount === 'colaborator';
        }
    },
    phoneCompany: {
        type: String,
        required: function() {
            return this.typeAccount === 'colaborator';
        }
    },
    adressCompany: {
        type: String,
        required: function() {
            return this.typeAccount === 'colaborator';
        }
    },
    logoCompany: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

loginSchema.pre("save", async function(next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
});

const user = mongoose.model("Login", loginSchema);

module.exports = user;
