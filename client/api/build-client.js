import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // This code runs on the server
        return axios.create({
            //baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            baseURL: 'foodmyfood.com',
            headers: req.headers,
        });
    }
    else {
        // This code runs on the browser
        return axios.create({
            baseURL: '/',
        });
    }
}