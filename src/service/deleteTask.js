import api from './api'

export default{
    async deleteTask(id){        
            const res = await api.delete(`/task/${id}`)
            return res;        
    }
}

