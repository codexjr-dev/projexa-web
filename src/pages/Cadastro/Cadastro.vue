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
    import scriptModule from './Cadastro.js'

    export default{
        name: scriptModule.name,
        components: scriptModule.components,
        mounted: scriptModule.mounted,
        data: scriptModule.data,
        computed: scriptModule.computed,
        methods: scriptModule.methods
    }
</script>

<style lang="scss" scoped>
    @import './Cadastro.scss';
</style>