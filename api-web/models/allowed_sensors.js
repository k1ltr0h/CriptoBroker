"use strict";
//Dependences
const config = require("../config.json")

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config);


const allowed_sensors = sequelize.define('allowedsensors', {
    id: { type:Sequelize.STRING, allowNull: false, primaryKey: true}
    },{ timestamps: false});

//allowed_sensors.removeAttribute('id');
module.exports = allowed_sensors;