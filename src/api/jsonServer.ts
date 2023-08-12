import axios from 'axios';

export default axios.create({
    baseURL: 'https://1c85-82-205-25-188.ngrok.io',
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: [
        data => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        data => {
            return JSON.parse(data);
        },
    ],
});
