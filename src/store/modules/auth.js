import axios from '@/utils/axios'

const actions = {
    async login({ commit }, dados) {
        const result = await axios({
            method: 'POST',
            data: dados,
            url: 'sign-in'
        })
        return result.data
    }
}

export default {
    actions
}