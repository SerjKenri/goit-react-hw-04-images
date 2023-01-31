import axios from "axios";
import propTypes from 'prop-types'

axios.defaults.baseURL = `https://pixabay.com/api`;

const APIKEY = '31432345-842eedf1cadf98cbef968cc4e';

export const fetchImagesApi = async (inputValue, pageNr) => {
    const response = await axios.get(`/?q=${inputValue}&page=${pageNr}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
};

fetchImagesApi.propTypes = {
    inputValue: propTypes.string.isRequired,
    pageNr: propTypes.number.isRequired,
};