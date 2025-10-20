<template lang="pug">
div.page
  div.content
    el-card
      el-table(
        :data="organizations"
        stripe
      )
        el-table-column(
          prop="name",
          label="Organização",
          :width="250"
        )
        el-table-column(
          prop="description",
          label="Descrição",
          :width="400"
        )
        el-table-column(
          prop="members.length",
          label="Membros",
          :width="120"
        )
        el-table-column(
          prop="createdAt",
          label="Criado em",
          :formatter="formatDate"
          :width="180"
        )
        el-table-column(
          label="Ações"
          align="right"
        )
          template(#default="scope")
            div.actions()
              div.actions-button(
                @click="openModal(scope.row)"
                :style="'background: #4B53C6'"
              )
                el-icon
                  Edit()
              div.actions-button(
                v-if="isLeadership"
                @click="handleOpenAddMember(scope.row)"
                :style="'background: #75D4C9'"
              )
                el-icon
                  Plus()
              div.actions-button(
                v-if="isLeadership"
                @click="handleDeleteOrganization(scope.$index, scope.row)"
                :style="'background: #F89898'"
              )
                el-icon
                  DeleteFilled()

  el-dialog(
    center
    :before-close="closeModalWithoutRequest"
    :title="'Editar Organização:'"
    @close="closeModal"
    v-model="showEditOrgModal"
  )
    adicionar-membro(
      :organization="editableOrg"
    )
    template(#footer)
      span.dialog-footer
        el-button(
          @click="editOrganization()"
          type="primary"
          color="#4b53c6"
        ) Salvar
</template>

<script>
import scriptModule from './OrganizationManagement.js';

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
@import './OrganizationManagement.scss';
</style>
