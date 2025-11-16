import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = `${be}/api`

const getDistrictsByCityId = async (cityId) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/public/districts?city_id=${cityId}`)
        if(data.success) {
            return data.data
        }
    } catch (error) {
        console.log(error)
    }
}

const getWardsByCityId = async (wardId) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/public/wards?city_id=${wardId}`)
        if(data.success) {
            return data.data
        }
    } catch (error) {
        console.log(error)
    }
}

export { getDistrictsByCityId, getWardsByCityId }