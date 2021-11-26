import api from './api'
const header = {headers: {'Content-Type': 'application/json'}}

export default{
    async postTask(data){         
            const dataJson = JSON.stringify(data);
            const res = await api.post("/task", dataJson, header)
            return res;        
    }
    
}

