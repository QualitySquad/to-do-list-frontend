import api from './api'
const header = {headers: {'Content-Type': 'application/json'}}

export default{
    async putTask(data) {         
            const dataJson = JSON.stringify(data);
            const res = await api.put(`/task/${data.id}`, dataJson, header)
            return res;        
    }
}

