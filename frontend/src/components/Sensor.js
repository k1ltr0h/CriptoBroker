import React, { Component } from 'react';
import {Tvoc, Temperature} from 'react-environment-chart';

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
            <div>
                <h3>
                    temperature: {temperature}
                </h3>
                <h3>
                    lugar: {location}
                </h3>
                <h3>
                    humedad: {humidity}
                </h3>
                <h3>
                    PH: {ph}
                </h3>
                <Tvoc 
                    value={0.4}    
                />
                <Temperature 
                    value={temperature}
                />
            </div>
        )
    }
}