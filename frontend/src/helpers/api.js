import axios from 'axios';

const endpoints = {
    develoment: 'http://localhost:9600',
};

const username = ''
const password = ''

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
export const api = axios.create({
    baseURL: endpoints['develoment'], //Ajustar linea respecto a entorno production o develoment
    timeout: 20000,
    headers: {
        'Authorization': `Basic ${token}`,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET'
    }
});
