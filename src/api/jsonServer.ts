import axios from 'axios';

export default axios.create({
    baseURL: 'https://7864-188-161-175-176.ngrok.io',

    headers: {
        'Content-Type': 'application/json',
    },
    // transformRequest: [
    //     data => {
    //         return JSON.stringify(data);
    //     },
    // ],
    transformResponse: [
        data => {
            return JSON.parse(data);
        },
    ],
});
