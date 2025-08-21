<template lang="pug">
div.cadastro-page
   div.cadastro-form
      span.page-title Cadastre sua EJ
      el-input(
         placeholder="digite o nome da ej"
         v-model="cadastroData.name"
      )
      el-input(
         placeholder="digite o nome do presidente"
         v-model="cadastroData.presidentData.name"
      )
      el-input(
         placeholder="digite o email"
         v-model="cadastroData.presidentData.email"
      )
      el-input(
         placeholder="digite a senha"
         v-model="cadastroData.presidentData.password"
         show-password
      )
      el-date-picker(
         placeholder="digite a sua data de nascimento"
         v-model="cadastroData.presidentData.birthDate"
      )
      el-button(
         type="primary"
         round
         @click="save"
      ) Criar conta
      el-button(
         type="secondary"
         round
         @click="login"
      ) Entrar
</template>

<script>
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
</script>

<style lang="scss" scoped>
.cadastro-page {
   background: #e6e6e6;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;

   .cadastro-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30vw;
      padding: 33px;
      gap: 4vh;
      border: 2px solid #808080;
      border-radius: 20px;
      height: 70vh;
      justify-content: center;

      .el-button {
         width: 50%;
      }
   }
}
</style>
