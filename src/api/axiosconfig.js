import axios from "axios";

export default axios.create({
    baseURL:'http://192.168.8.179:8081',
    headers:{"Content-Type": "application/json"}
});