import axios from "axios";

// const BaseUrl = 'https://autobuddys-server.herokuapp.com/elder/';
const BaseUrl = 'http://localhost:8080/api/'

const axiosInstance = axios.create({
    baseURL : BaseUrl,
    timeout : 10000,
    headers: {
		// Authorization: localStorage.getItem('access_token')? ('JWT ' + localStorage.getItem('access_token')): null,
        'x-access-token': localStorage.getItem('token')? (localStorage.getItem('token')): null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
})


export default axiosInstance;
export {BaseUrl}