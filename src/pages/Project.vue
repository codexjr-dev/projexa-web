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
            prop="description",
            label="Descrição",
         )
         el-table-column(
            prop="team",
            label="Time",
            :formatter="formatList"
         )
         el-table-column(
            prop="startDate",
            label="Data de início",
            :formatter="formatDate"
            :width="150"
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
                     v-if="isLeadership || onTeam(scope.row)"
                     @click="handleAddNews(scope.$index, scope.row)"
                     :style="'background: #A8CDE8'"
                  )
                     el-icon
                        Plus()
                  div.actions-button(
                     @click="handleViewNews(scope.$index, scope.row)"
                     :style="'background: #E8A8CE'"
                  )
                     el-icon
                        List()
                  div.actions-button(
                     v-if="isLeadership"
                     @click="handleEditProject(scope.$index, scope.row)"
                     :style="'background: #4b53c6'"
                  )
                     el-icon
                        Edit()
                  div.actions-button(
                     @click="handleViewProject(scope.$index, scope.row)"
                     :style="'background: #67c23a'"
                  )  
                     el-icon
                        View()
                  div.actions-button(
                     v-if="isLeadership"
                     @click="handleDeleteProject(scope.$index, scope.row)"
                     :style="'background: #e07c72'"
                  )
                     el-icon
                        DeleteFilled()
   el-dialog(
      center
      fullscreen=true
      :before-close="handleClose"
      :title="titleModal"
      @close="closeModal"
      v-model="showModal"
   )
      adicionar-projeto(
         :titleModal='titleModal'
         :isVisualizar="isVisualizar"
         :invalid="invalid"
         :projeto="novoProjeto"
         @setValidField="setValidField"
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

   el-dialog(
      center
      :before-close="handleClose"
      :title="titleModal"
      @close="closeModal"
      v-model="showModalAddNews"
   )
      add-news-modal(
         :titleModal='titleModal'
         :news="newsToBeCreated"
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
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import AdicionarProjeto from '@/components/modals/AdicionarProjeto.vue'
import AddNewsModal from '@/components/modals/AddNewsModal.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'
import moment from 'moment';

export default {
   name: 'Project',

   components: {
      AdicionarProjeto,
      AddNewsModal
   },

   async mounted() {
      ElNotification.closeAll()
      ElNotification({
         title: 'Aguarde...',
         message: 'A coleta de projetos pode levar alguns instantes',
         type: 'warning',
      });
      this.$store.commit('SHOW_SIDEBAR', true);
      this.userInfo = await this.getUserInfo();
      this.$store.commit('SET_SIDEBAR_OPTION', this.$route.name.toLowerCase())
      const res = await this.findAllProjects()
      this.dados = res.projects
      ElNotification.closeAll();
      ElNotification({
         title: 'Sucesso!',
         message: 'Lista de projetos coletada.',
         type: 'success',
      });
   },

   data() {
      return {
         invalid: false,
         validFields: {
            projectName: false,
            projectContractLink: false,
            projectDescription: false,
            projectStartDate: false,
            projectFinishDate: false,
            projectTags: false,
            projectTeam: false,
            customerName: false,
            customerPhone: false,
         },
         dados: [],
         novoProjeto: cloneDeep(models.emptyProject),
         newsToBeCreated: cloneDeep(models.emptyNews),
         titleModal: 'Adicionar Projeto',
         isEditar: false,
         isVisualizar: false,
         userInfo: {}
      }
   },

   computed: {
      showModal() {
         return this.$store.state.header.modal === 'projeto'
      },
      showModalAddNews() {
         return this.$store.state.header.modal === "add_news"
      },
      isLeadership() {
         return ['Presidente', 'Diretor(a)', "Guardiã(o)"].includes(localStorage.getItem("@role"))
      }
   },

   methods: {
      ...mapActions({
         findAllProjects: 'findAllProjects',
         createProject: 'createProject',
         updateProject: 'updateProject',
         deleteProject: 'deleteProject',
         createNews: 'createNews',
         getUserInfo: 'userInfo'
      }),

      onTeam(row) {
         return this.getTeamMembersId(row).includes(this.userInfo.sub._id);
      },

      formatDate(row, column, prop) {
         return Utils.formatDate(prop);
      },

      formatList(row, column, prop) {
         let listFormated = '';
         prop.forEach((item, index) => {
            if (index !== prop.length - 1)
               listFormated += item.name + ', ';
            else
               listFormated += item.name;
         });
         return listFormated;
      },

      async closeModal() {
         this.isVisualizar = false
         this.isEditar = false
         this.novoProjeto = cloneDeep(models.emptyProject)
         await this.getProjetos()
         this.$store.commit('SET_MODAL', '')
      },

      handleClose() {
         this.$store.commit('SET_MODAL', '')
      },

      getTeamMembersId(row) {
         return row.team[0] && row.team[0].name ? row.team.map((user) => user._id) : row.team;
      },

      async getProjetos() {
         const res = await this.findAllProjects()
         this.dados = res.projects
      },

      handleViewProject(index, row) {
         this.isVisualizar = true
         row.team = this.getTeamMembersId(row);
         this.novoProjeto = row
         this.titleModal = row.name
         this.$store.commit('SET_MODAL', 'projeto')
      },

      handleEditProject(index, row) {
         this.isVisualizar = false
         this.isEditar = true
         row.team = this.getTeamMembersId(row);
         this.novoProjeto = row
         this.titleModal = 'Editar projeto'
         this.$store.commit('SET_MODAL', 'projeto')
      },

      setValidField(fieldName, value) {
         this.validFields[fieldName] = value;
      },

      isValid() {
         let isValid = true;
         Object.values(this.validFields).forEach(value => {
            if (!value) isValid = false;
         })
         this.invalid = !isValid;
         return isValid;
      },

      async salvar() {
         try {
            if (this.isValid()) {
               const res = await this.createProject(this.novoProjeto)
               ElNotification.closeAll()
               ElNotification({
                  title: 'Tudo certo!',
                  message: `Projeto ${res.project.name} foi cadastrado com sucesso`,
                  type: 'success',
               })
               this.$store.commit('SET_MODAL', '')
               await this.getProjetos()
               this.novoProjeto = cloneDeep(models.emptyProject)
            }
         } catch (error) { }
      },

      async editar() {
         try {
            const res = await this.updateProject({ project: this.novoProjeto, id: this.novoProjeto._id })
            this.isEditar = false
            this.$store.commit('SET_MODAL', '')
            ElNotification.closeAll()
            ElNotification({
               title: 'Tudo certo!',
               message: `${res.project.name} foi editado com sucesso`,
               type: 'success',
            })
            await this.getProjetos()
            this.novoProjeto = cloneDeep(models.emptyProject)
         } catch (error) { }
      },

      handleAddNews(index, row) {
         this.novoProjeto = row;
         this.titleModal = 'Adicionar atualização'
         this.$store.commit('SET_MODAL', 'add_news')
      },

      async saveNews() {
         try {
            await this.createNews({ news: this.newsToBeCreated, projectId: this.novoProjeto._id })
            ElNotification.closeAll()
            ElNotification({
               title: 'Tudo certo!',
               message: `Atualização criada com sucesso!`,
               type: 'success',
            });
            this.$store.commit('SET_MODAL', '');
            this.novoProjeto = cloneDeep(models.emptyProject);
            this.newsToBeCreated = cloneDeep(models.emptyNews);
         } catch (error) { }
      },

      async handleViewNews(index, row) {
         this.$router.push({
            name: 'ViewNews',
            params: { projectId: JSON.stringify(row._id) }
         });
      },

      handleDeleteProject(index, row) {
         ElMessageBox.confirm(
            `Excluir projeto ${row.name} do sistema?`,
            'Atenção',
            {
               confirmButtonText: 'Excluir',
               cancelButtonText: 'Cancelar',
               type: 'warning',
            }
         ).then(async () => {
            await this.excluir(index, row)
         })
      },

      async excluir(index, row) {
         try {
            await this.deleteProject(row._id)
            ElNotification.closeAll()
            ElNotification({
               title: 'Tudo certo!',
               message: 'Projeto removido com sucesso',
               type: 'success',
            })
            await this.getProjetos()
         } catch (error) { }
      },
   }
}
</script>

<style lang="scss" scoped>
.el-card {
   margin-left: 2%;
   margin-right: 2%;
   margin-top: 2%
}

.actions {
   display: flex;
   align-items: center;
   justify-content: end;
   flex-direction: row;
}

.actions-button {
   width: 45px;
   height: 35px;
   background: #e6e6e6;
   font-size: 70%;
   border-radius: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   margin: 4px;
   padding: auto;
}

.actions-button:hover {
   cursor: pointer;
}

.el-icon {
   width: 35%;
   height: 30%;

   svg {
      height: 5em;
      width: 5em;
      color: white;
      margin: 0;
   }
}

span {
   color: #808080;
   margin: 0;
}
</style>
