import axios from "axios";

export default axios.create({
    baseURL: "https://project-pharmacy.herokuapp.com/pharmacy/"
});