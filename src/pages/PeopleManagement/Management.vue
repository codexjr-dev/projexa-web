<template lang="pug">
div.cadastro-page
   div.cadastro-form
      span.page-title Formulário Semanal
      el-date-picker(
         placeholder="Data do Sábado"
         v-model="cadastroData.semana"
      )
      el-input(
         placeholder="Segunda"
         v-model="cadastroData.segunda"
      )
      el-input(
         placeholder="Terça"
         v-model="cadastroData.terca"
      )
      el-input(
         placeholder="Quarta"
         v-model="cadastroData.quarta"
      )
      el-input(
         placeholder="Quinta"
         v-model="cadastroData.quinta"
      )
      el-input(
         placeholder="Sexta"
         v-model="cadastroData.sexta"
      )
      el-input(
         placeholder="Sabado"
         v-model="cadastroData.sabado"
      )
      el-input(
         placeholder="Domingo"
         v-model="cadastroData.domingo"
      )
      el-button(
         type="primary"
         round
         @click="save"
      ) Enviar
</template>

<script>
    import scriptModule from './Management.js'

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
    @import './Management.scss';
</style>
