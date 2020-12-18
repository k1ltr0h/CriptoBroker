"use strict";
//Dependences
const config = require("..\\config.json")

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config);


const sensores = sequelize.define('sensores', {
    id_sensor: { type:Sequelize.INTEGER, allowNull: false},
    lectura: {type:Sequelize.STRING, allowNull: false},
    timestamp: {type:'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false}
    });

    module.exports = sensores;