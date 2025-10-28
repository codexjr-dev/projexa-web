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

    el-card
      h3 Gráfico Financeiro
      div.chart-wrapper
        OrganizationChart(:labels="chartLabels" :datasets="chartDatasets")

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
import OrganizationChart from '@/components/OrganizationChart.vue'

export default {
  name: scriptModule.name,
  components: { ...scriptModule.components, OrganizationChart },
  
  data() {
    return {
      ...scriptModule.data(),
      chartLabels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
      chartDatasets: [
        {
          label: 'Valor em caixa',
        data: [1000, 2000, 2900, 3900, 4600, 5000, 5000, 5700, 6200, 5500, 6100, 5900],
        borderColor: '#4B53C6',
        backgroundColor: 'rgba(75,83,198,0.2)',
        tension: 0.3 
        },
        {
        label: 'Despesas',
        data: [2000, 2500, 2300, 3000, 2900, 3400, 3400, 3200, 3200, 4100, 3700, 4000],
        borderColor: '#d12a2aff',
        backgroundColor: 'rgba(248,152,152,0.2)',
        tension: 0.3
      },
      {
        label: 'Entrada',
        data: [3000, 3500, 3200, 4000, 3600, 3800, 3400, 3900, 3700, 3400, 4300, 3800],
        borderColor: '#137267ff',
        backgroundColor: 'rgba(117,212,201,0.2)',
        tension: 0.3
        }
      ]
    }
  },

  mounted() {
    scriptModule.mounted?.call(this)
    
  },

  computed: scriptModule.computed,

  methods: {
    ...scriptModule.methods
    
  },

  watch: {
    
  }
}
</script>

<style lang="scss" scoped>
@import './OrganizationManagement.scss';

.chart-wrapper {
  width: 100%;
  max-width: 900px;
  height: 500px;
  margin: 20px auto;
}
</style>
