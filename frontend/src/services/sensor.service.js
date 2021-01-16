import {api} from '../helpers/api';
const basePath = '/sensor';

function get_sensors() {
    return api.get(`${basePath}/all`)
}

function get_sensor(idd){
    return api.get(`${basePath}/id/${idd}`)
}

const sensorService = {get_sensors,get_sensor}
export default sensorService;