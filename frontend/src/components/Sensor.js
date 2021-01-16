import React, { Component } from 'react';
import { Temperature,} from 'react-environment-chart';
import {Col} from 'react-bootstrap';
import sensorService from '../services/sensor.service';
var aesjs = require('aes-js');

export default class Sensor extends Component {
    constructor(props){
        super(props)
        this.state = {
            location: this.props.location,
            id : this.props.id,
            temperature_str: null,
            token: null,
            temperature: 0,
            //humidity: 80,
            //ph: -1,
            //uv: 0
        }
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.fetch_from_api()
        
        }, 6000);
    }
    fetch_from_api(){
        sensorService.get_sensor(this.state.id).then(
            res=> {
                const data = res.data['data'][0];
                
                if(typeof data !== 'undefined'){
                    const temp_token = data.token.split(",")
                    const temp_lecture = data.lectura.split(",")

                    for (var t in temp_token){
                        temp_token[t] = parseInt(temp_token[t], 10)
                    }
                    for (var a in temp_lecture){
                        temp_lecture[a] = parseInt(temp_lecture[a], 10)
                    }

                    this.setState({token: temp_token})
                    this.setState({temperature_str: temp_lecture})
                    //console.log(this.state.token)
                    this.handle_temperature()
                }  
            })      
    }

    handle_temperature(){
        //var aes_id = new aesjs.ModeOfOperation.ofb(this.state.key, iv);
        //var decrypted_id_Bytes = aes_id.decrypt(id_sensor);
        //var id_decrypted = aesjs.utils.utf8.fromBytes(decrypted_id_Bytes);

        const key = [70, 251, 179, 142, 194, 240, 230, 117, 242, 181, 175, 93, 117, 144, 189, 6]
        var aes_lecture = new aesjs.ModeOfOperation.ofb(key, this.state.token);
        var decrypted_lecture_Bytes = aes_lecture.decrypt(this.state.temperature_str);
        var lecture_decrypted = aesjs.utils.utf8.fromBytes(decrypted_lecture_Bytes)
        
        var int_temp = parseInt(lecture_decrypted.split("Temperature Sensor[Celsius]: ")[1], 10)
        this.setState({temperature: int_temp});
        console.log(int_temp)
    }

    render(){
        const {temperature, location} = this.state
        return(
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    <Col md={{ span: 3, offset: 3 }}>
                        <h4>
                            temperature: {temperature} <br/>
                            lugar: {location} <br/>
                        </h4>
                    </Col>
                    <Col>
                        <Temperature 
                            height={256}
                            value={temperature}
                        />
                    </Col> 
            </div>
        )
    }
}


/*

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

*/