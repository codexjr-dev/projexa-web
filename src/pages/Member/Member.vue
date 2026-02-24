<template lang="pug">
div
   el-card
      el-table(
         :data="dados"
         stripe
      )
         el-table-column(
            prop="name",
            label="Nome",
         )
         el-table-column(
            prop="email",
            label="Email",
         )
         el-table-column(
            prop="role",
            label="Cargos",
         )
         el-table-column(
            prop="birthDate",
            label="Data de nascimento",
            :formatter="formatDate"
         )
         el-table-column(
            label="Ações"
            align="right"
         )
            template(
               #default="scope"
            )
               div.actions()
                  div.actions-button(
                     v-if="isLeadership || isThisMemberLoged(scope.row)"
                     @click="handleEditar(scope.$index, scope.row)"
                     :style="'background: #4b53c6'"
                  )
                     el-icon
                        Edit()
                  div.actions-button(
                     @click="handleVisualizar(scope.$index, scope.row)"
                     :style="'background: #67c23a'"
                  )
                     el-icon
                        View()
                  div.actions-button(
                     v-if="isLeadership"
                     @click="handleExcluir(scope.$index, scope.row)"
                     :style="'background: #e07c72'"
                  )
                     el-icon
                        DeleteFilled()
   el-dialog(
      fullscreen=true
      center
      :before-close="closeModalWithoutRequest"
      :title="titleModal"
      @close="closeModal"
      v-model="showAddMemberModal"
   )
      adicionar-membro(
         :isVisualizar="isVisualizar"
         :invalid="invalid"
         :membro="novoMembro"
         :errorEmailInUse="errorEmailInUse"
         @setValid="setValid"
         @setValidName="setValidName"
         @setValidBirth="setValidBirth"
         @setValidEntry="setValidEntry"
         @setValidDepartament="setValidDepartament"
         @setValidRole="setValidRole"
         @setValidEmail="setValidEmail"
         @setValidPassword="setValidPassword"
         @setValidConfirm="setValidConfirm"
         @setValidPhone="setValidPhone"
      )
      template(
         #footer
      )
         span.dialog-footer
            el-button(
               v-if="!isVisualizar"
               @click="isEditar ? editar() : salvar()"
               type="primary"
               color="#4b53c6"
            ) Salvar
</template>

<script>
    import scriptModule from './Member.js'

    export default {
      name: scriptModule.name,
      components: scriptModule.components,
      mounted: scriptModule.mounted,
      data: scriptModule.data,
      computed: scriptModule.computed,
      methods: scriptModule.methods
   }
</script>

<style lang="scss" scoped>
    @import './Member.scss';
</style>