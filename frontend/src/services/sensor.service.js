import {api} from '../helpers/api';
const basePath = '/sensor';

function get_sensor(idd) {
    return api.get(`${basePath}/${idd}`)
}

const sensorService = {get_sensor}
export default sensorService;