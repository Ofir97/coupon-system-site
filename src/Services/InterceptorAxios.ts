import axios from 'axios';
import store from '../Redux/Store';

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {
    console.log(store.getState().authState.user?.token.toString())
    request.headers = {
        "authorization": store.getState().authState.user?.token.toString()
    };

    return request;
});

export default tokenAxios;