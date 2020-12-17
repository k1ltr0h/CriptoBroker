import React, { Component } from 'react';
import {Tvoc, Temperature,Humidity} from 'react-environment-chart';
import {Row,Col,Container} from 'react-bootstrap';

export default class Sensor extends Component {
    constructor(props){
        super(props)
        this.state = {
            location: this.props.location,
            temperature: -1,
            humidity: -1,
            ph: -1,
            uv: 0
        }
    }

    handle_temperature(){
        this.setState({temperature: 20});
    }

    handle_humidity(){
        this.setState({humidity: 50});
    }
    handle_uv(){
        this.setState({uv: 6});
    }
    handle_ph(){
        this.setState({ph: 8})
    }

    set_location(loc){
        this.setState({location: loc});
    };

    render(){
        const {temperature, location, humidity, ph, uv} = this.state
        return(
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    <Col md={{ span: 3, offset: 3 }}>
                        <h4>
                            temperature: {temperature} <br/>
                            lugar: {location} <br/>
                            humedad: {humidity} <br/>
                            PH: {ph}
                        </h4>
                    </Col>
                    <Col>
                        <Tvoc
                            height={256} 
                            value={uv}    
                        />
                    </Col>
                    <Col>
                        <Temperature 
                            height={256}
                            value={temperature}
                        />
                    </Col>
                    <Col>   
                        <Humidity 
                            value={humidity} 
                        />            
                    </Col>  
            </div>
        )
    }
}
