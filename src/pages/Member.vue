<template lang="pug">
div
   el-card
      el-table(
         :data="dados"
         stripe
         style="width: 100%"
         :table-layout="auto"
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
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import AdicionarMembro from '@/components/modals/AdicionarMembro.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
   name: 'Member',

   components: {
      AdicionarMembro,
   },

   async mounted() {
      this.sendNotification({
         title: 'Aguarde...',
         message: 'A coleta de membros pode levar alguns instantes',
         type: 'warning',
      });

      this.configHeader();

      await this.getMembers();

      this.sendNotification({
         title: 'Sucesso!',
         message: 'Lista de membros coletada.',
         type: 'success',
      });
   },

   data() {
      return {
         valid: false,
         validName: false,
         validBirth: false,
         validEntry: false,
         validDepartament: false,
         validRole: false,
         validEmail: false,
         validPassword: false,
         validConfirm: false,
         validPhone: false,
         invalid: false,
         dados: [],
         novoMembro: cloneDeep(models.emptyMember),
         isEditar: false,
         isVisualizar: false,
         titleModal: 'Adicionar Membro',
         errorEmailInUse: "",
      }
   },

   computed: {
      showAddMemberModal() {
         return this.$store.state.page.modalContext === 'ADD_OR_EDIT_MEMBER';
      },
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"));
      }
   },

   methods: {
      ...mapActions({
         findAllMembers: 'findAllMembers',
         createMember: 'createMember',
         updateMember: 'updateMember',
         deleteMember: 'deleteMember'
      }),

      configHeader() {
         this.$store.commit('SET_PAGE_CONTEXT', 'member');
         this.$store.commit('SET_HEADER_TITLE', 'Membros');
         this.$store.commit('SET_HEADER_BUTTON_VISIBILITY', true);
         this.$store.commit('SHOW_SIDEBAR', true);
      },

      formatDate(row, column, prop) {
         return Utils.formatDate(prop);
      },

      async getMembers() {
         const res = await this.findAllMembers();
         res.status === 404 ?
            localStorage.clear() || this.$router.push({ name: 'Home' })
            : this.dados = res.members;
      },

      isThisMemberLoged(member) {
         return member.loged;
      },

      setValid(value) {
         this.valid = value;
      },

      setValidName(value) {
         this.validName = value;
      },

      setValidBirth(value) {
         this.validBirth = value;
      },

      setValidEntry(value) {
         this.validEntry = value;
      },

      setValidDepartament(value) {
         this.validDepartament = value;
      },

      setValidRole(value) {
         this.validRole = value;
      },

      setValidEmail(value) {
         this.validEmail = value
      },

      setValidPassword(value) {
         this.validPassword = value;
      },

      setValidConfirm(value) {
         this.validConfirm = value;
      },

      setValidPhone(value) {
         this.validPhone = value;
      },

      setValidation() {
         if (!this.valid || !this.validName || !this.validBirth || !this.validEntry
            || !this.validDepartament || !this.validRole || !this.validEmail || !this.validPassword
            || !this.validConfirm || !this.validPhone) {
            this.invalid = true;
         } else {
            this.invalid = false;
         }
         return (this.valid && this.validName && this.validBirth && this.validEntry
            && this.validDepartament && this.validRole && this.validEmail && this.validPassword
            && this.validConfirm && this.validPhone);
      },

      handleEditar(index, row) {
         this.openModal(index, row, 'ADD_OR_EDIT_MEMBER');
         this.isVisualizar = false;
         this.isEditar = true;
         this.titleModal = 'Editar Membro';
      },

      handleVisualizar(index, row) {
         this.openModal(index, row, 'ADD_OR_EDIT_MEMBER');
         this.isVisualizar = true;
         this.isEditar = false;
         this.titleModal = row.name;
      },

      handleExcluir(index, row) {
         ElMessageBox.confirm(
            `Excluir membro ${row.name} do sistema?`,
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

      async salvar() {
         try {
            if (this.setValidation()) {
               const res = await this.createMember(this.novoMembro)

               this.sendNotification({
                  title: 'Tudo certo!',
                  message: `${res.member.name} foi cadastrado com sucesso`,
                  type: 'success',
               });

               this.closeModal();
            }
         } catch (error) {
            if (error.response.data.error === 'EMAIL_ALREADY_IN_USE') {
               this.errorEmailInUse = 'Já existe um membro cadastrado com esse email!';
            } else {
               this.errorMessage = 'Ocorreu um erro ao processar a solicitação.';
            }
         }
      },

      async editar() {
         try {
            const res = await this.updateMember({ membro: this.novoMembro, id: this.novoMembro._id });

            this.sendNotification({
               title: 'Tudo certo!',
               message: `${res.member.name} foi editado com sucesso`,
               type: 'success',
            });

            this.closeModal();
         } catch (error) { }
      },

      async excluir(index, row) {
         try {
            await this.deleteMember(row._id)

            this.sendNotification({
               title: 'Tudo certo!',
               message: 'Membro removido com sucesso',
               type: 'success',
            });

            await this.getMembers()
         } catch (error) {
            this.sendNotification({
               title: 'Falha ao remover membro!',
               message: 'A presença de ao menos uma liderança na EJ é obrigatória.',
               type: 'error',
            });

            await this.getMembers()
         }
      },

      openModal(index, row, modal) {
         this.novoMembro = row;
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', modal);
      },

      async closeModal() {
         this.closeModalWithoutRequest();
         await this.getMembers();
      },

      closeModalWithoutRequest() {
         this.isVisualizar = false;
         this.isEditar = false;
         this.titleModal = 'Adicionar Membro';
         this.novoMembro = cloneDeep(models.emptyMember);
         this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
      },

      sendNotification(notification) {
         ElNotification.closeAll();
         ElNotification(notification);
      }
   }
}
</script>

<style lang="scss" scoped>
.el-card {
   margin-left: 2%;
   margin-right: 2%;
   margin-top: 2%;
}

.actions {
   display: flex;
   align-items: center;
   justify-content: end;
   flex-direction: row;
}

.actions-button {
   width: 45px;
   height: 40px;
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
      height: 3em;
      width: 3em;
      color: white;
      margin: 0;
   }
}

span {
   color: #808080;
   margin: 0;
}
</style>
