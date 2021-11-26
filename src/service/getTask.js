import api from './api'

export default{
    async getTask(){
            const res = await api.get('/task')
            return res
    }
}