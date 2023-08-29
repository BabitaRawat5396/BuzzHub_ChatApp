import axios from 'axios';

// creating generalized function which call all types (get,put etc)
export const axiosInstance = axios.create({});

// function which will call backend api's
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}