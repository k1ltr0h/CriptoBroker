import React, { Component } from 'react';
import Sensor from'../components/Sensor';

export default class Dashboard extends Component { 
    render() {
        return (
            <>
                    <Sensor
                        location={"valpo"}
                        id={27}
                    />
                
                    <Sensor
                        location={"santiago"}
                        id={28}
                    />
            </>
        )
    }
}