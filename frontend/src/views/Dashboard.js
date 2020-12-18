import React, { Component } from 'react';
import Sensor from'../components/Sensor';
import {Row,Col,Container} from 'react-bootstrap';

export default class Dashboard extends Component {
    constructor(props){
        super(props)  
    }
 
    render() {
        return (
            <>
                    <Sensor
                        location={"valpo"}
                    />
                
                    <Sensor
                        location={"santiago"}
                    />
            </>
        )
    }
}