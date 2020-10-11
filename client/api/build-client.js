import axios from 'axios';

const buildClient = ({ req }) => {
    if(typeof window === 'undefined') {
        //onserver
        return axios.create({
            baseURL: 'http://www.bigcouch.app', 
            headers: req.headers
        });
    } else {
        //onbrowser
        return axios.create({
            baseURL: '/',
        });
    }
}

export default buildClient;