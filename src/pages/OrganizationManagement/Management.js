import axios from '@/utils/axios'
import { mapActions } from 'vuex'
import { ElNotification} from 'element-plus'

const actions = {
    async createOrganization({ commit }, dados) {
        const data = await axios({
            method: 'POST',
            data: dados,
            url: 'ej'
        })
        return data
    }
}


export default {
    actions,

    name:'Cadastro',
    
    data() {
        return {
                cadastroData: {
                    name: '',
                    presidentData: {
                    name: '',
                    email: '',
                    birthDate: '',
                    password: '',
                    },
                },
            }
        },
    
       mounted() {
          this.$store.commit('SHOW_SIDEBAR', false)
       },
    
       methods: {
          ...mapActions({
             createEj: 'createEj',
          }),
    
          async save() {
             ElNotification.closeAll();
             ElNotification({
                title: 'Aguarde...',
                message: 'O cadastro da organização pode levar alguns instantes',
                type: 'warning',
             });
    
             try {
                await this.createEj(this.cadastroData)
                ElNotification.closeAll();
                ElNotification({
                   title: 'Sucesso',
                   message: 'A Organização foi cadastrada com sucesso!',
                   type: 'success',
                })
                this.$router.push({ name: 'Login' })
             } catch (error) {
                ElNotification.closeAll();
                ElNotification({
                   title: 'Ops!',
                   message: 'Ocorreu um erro no seu cadastro',
                   type: 'error',
                })
             }
    
          },
    
          login() {
             this.$router.push({ name: 'Login' })
          }
       }
}
