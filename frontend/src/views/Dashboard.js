import React, { Component } from 'react';
import Sensor from'../components/Sensor';
import {Row} from 'react-bootstrap';

export default class Dashboard extends Component { 
    render() {
        return (
            <>
                <Row>
                    <Sensor
                        location={"Valparaiso"}
                        id={0}
                    />
                    <Sensor
                        location={"Santiago"}
                        id={1}
                    />
                </Row>
                <Row>
                    <Sensor
                        location={"Calama"}
                        id={2}
                    />
                    <Sensor
                        location={"Rodrigo"}
                        id={3}
                    />
                    <Sensor
                        location={"Puerto Varas"}
                        id={4}
                    />
                </Row>
            </>
        )
    }
}