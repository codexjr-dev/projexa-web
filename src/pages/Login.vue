<template lang="pug">
div.login-page
   div.login-form
      span.page-title Entre na sua conta
      el-input(
         placeholder="Email"
         v-model="dados.email"
      )
      el-input(
         placeholder="Senha"
         v-model="dados.password"
         show-password
      )
      el-button(
         type="primary"
         @click="entrar"
      ) Entrar
      el-button(
         type="secondary"
         @click="cadastro"
      ) Criar uma conta
</template>

<script>
import { mapActions } from 'vuex'
import { ElNotification } from 'element-plus'

export default {
   name: 'Login',

   data() {
      return {
         dados: {
            email: '',
            password: '',
         },
      }
   },

   mounted() {
      this.$store.commit('SHOW_SIDEBAR', false)
   },

   methods: {
      ...mapActions({
         login: 'login',
      }),

      async entrar() {
         ElNotification.closeAll();
         ElNotification({
            title: 'Aguarde...',
            message: 'O login pode levar alguns instantes',
            type: 'warning',
         });

         if (this.validarCampos()) {
            try {
               const res = await this.login(this.dados)
               localStorage.setItem('@jwt', res.dados.token)
               localStorage.setItem('@role', res.dados.member.role)
               this.$store.commit('SHOW_SIDEBAR', true)
               this.$router.push({ name: 'Member' })
               ElNotification.closeAll();
               ElNotification({
                  title: 'Sucesso!',
                  message: 'Login efetuado.',
                  type: 'success',
               });
            } catch (error) {
               ElNotification.closeAll();
               ElNotification({
                  title: 'Ops!',
                  message: 'Usuário ou senha incorretos',
                  type: 'error',
               })
               console.error(error.message)
            }
         }
      },

      cadastro() {
         this.$router.push({ name: 'Cadastro' })
      },

      validarCampos() {
         return this.dados.email !== '' && this.dados.password !== ''
      },
   },
}
</script>

<style lang="scss" scoped>
.login-page {
   background: #e6e6e6;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;

   .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30vw;
      padding: 33px;
      gap: 4vh;
      border: 2px solid #808080;
      border-radius: 20px;
      height: 50vh;
      justify-content: center;

      .el-button {
         width: 50%;
      }
   }
}
</style>
