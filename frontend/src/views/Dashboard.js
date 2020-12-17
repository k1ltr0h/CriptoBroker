import React, { Component } from 'react';
import Sensor from'../components/Sensor';

export default class Dashboard extends Component {
    constructor(props){
        super(props)  
    }
 
    render() {
        const met = "metropolitana";
        return (
            <Sensor
                location={"valpo"}
            />
        )
    }
}