import axios from 'axios'



export default function() {
    let instance = axios.create()

    const token = localStorage.getItem('token');

    if (token) {
        instance = axios.create({
            headers: {
                authorization: "bearer " + token
            }
        })
    }

    instance.interceptors.response.use((response) => {
        if(response.headers.authorization){
            localStorage.setItem('token',response.headers.authorization);
        }

        if (response.data.code === 200) {
            return response.data.data
        } else {
            return response.data
        }
    },(err)=>{
        if(err.response.status === 403){
            localStorage.removeItem('token');
        }
        return Promise.reject(err);
    })

    return instance
}