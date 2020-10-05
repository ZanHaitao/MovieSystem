import axios from 'axios'

const instance = axios.create()

instance.interceptors.response.use((response) => {
    if(response.data.code === 200){
        return response.data.data
    }else{
        return response.data
    }
})

export default instance
