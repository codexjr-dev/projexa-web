<template lang="pug">
div.cadastro-page
   div.cadastro-form
      span.page-title Formulário Semanal
      
      div.input-group
         span.input-label Data do Sábado
         el-date-picker(
            v-model="cadastroData.semana"
            style="width: 100%"
         )
      
      div.input-group
         span.input-label Segunda
         el-input(
            type="textarea"
            :rows="2"
            v-model="cadastroData.segunda"
         )
      
      div.input-group
         span.input-label Terça
         el-input(
            type="textarea"
            :rows="2"
            v-model="cadastroData.terca"
         )
      
      div.input-group
         span.input-label Quarta
         el-input(
            type="textarea"
            :rows="2"
            v-model="cadastroData.quarta"
         )
      
      div.input-group
         span.input-label Quinta
         el-input(
            type="textarea"
            :rows="2"
            v-model="cadastroData.quinta"
         )
      
      div.input-group
         span.input-label Sexta
         el-input(
            type="textarea"
            :rows="2"
            v-model="cadastroData.sexta"
         )
      
      div.input-group
         span.input-label Sábado
         el-input(
            type="textarea"
            :rows="2"
            v-model="cadastroData.sabado"
         )
      
      div.input-group
         span.input-label Domingo
         el-input(
            type="textarea"
            :rows="2"
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
