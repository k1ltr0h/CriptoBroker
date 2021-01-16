"use strict";
//Dependences
const config = require("../config.json")

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config);


const sensores = sequelize.define('sensores', {
    id_sensor: { type:Sequelize.STRING, allowNull: false},
    lectura: {type:Sequelize.STRING, allowNull: false},
    token: {type:Sequelize.STRING, allowNull: false},
    fecha: {type:'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false}
    },{ timestamps: false});

sensores.removeAttribute('id');
module.exports = sensores;
    