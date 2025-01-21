import { mapActions } from 'vuex'
import { ElNotification, ElMessageBox } from 'element-plus'

export default {
   name: 'Cadastro',

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
            message: 'O cadastro da empresa pode levar alguns instantes',
            type: 'warning',
         });

         try {
            await this.createEj(this.cadastroData)
            ElNotification.closeAll();
            ElNotification({
               title: 'Sucesso',
               message: 'A Empresa Júnior foi cadastrada com sucesso!',
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