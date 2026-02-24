import axios from '@/utils/axios'

const actions = {
    async createOrganization({ commit }, dados) {
        const data = await axios({
            method: 'POST',
            data: dados,
            url: 'organization'
        })
        return data;
    }
}

export default {
    actions
}