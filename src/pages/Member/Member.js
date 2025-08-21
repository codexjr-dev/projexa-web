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
         return ['Presidente', 'Diretor(a)', "Guardiã(o)"].includes(localStorage.getItem("@role"));
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