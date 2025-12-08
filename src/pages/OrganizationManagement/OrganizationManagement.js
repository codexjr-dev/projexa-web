import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import { ElNotification, ElMessageBox } from 'element-plus'
import AdicionarMembro from '@/components/modals/AdicionarMembro.vue'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
  name: 'OrganizationManagement',

  components: {
    AdicionarMembro
  },

  async mounted() {
    this.configHeader();

    this.userInfo = await this.getUserInfo();

    this.sendNotification({
      title: 'Aguarde...',
      message: 'Carregando organizações e membros...',
      type: 'warning',
    });

    const data = await this.getAllOrganizations();

    if (data && data.status !== 500) {
      this.organizations = data.organizations || [];
      this.title = this.getTitle();

      this.sendNotification({
        title: 'Sucesso!',
        message: 'Organizações carregadas.',
        type: 'success',
      });
    } else {
      this.sendNotification({
        title: 'Erro ao carregar',
        message: 'Não foi possível buscar organizações.',
        type: 'error'
      });
    }
  },

  data() {
    return {
      organizations: [],
      userInfo: {},
      title: '',
      editableOrg: cloneDeep(models.emptyOrganization || {}),
      valorEmCaixa: [1000, 2000, 3000, 3900, 4600, 5000, 5000, 5700, 6200, 5500, 6100, 5900],
      despesas: [2000, 2500, 2300, 3000, 2900, 3400, 3400, 3200, 3200, 4100, 3700, 4000],
      entradas: [3000, 3500, 3200, 4000, 3600, 3800, 3400, 3900, 3700, 3400, 4300, 3800],
    };
  },

  computed: {
    isLeadership() {
      return ['Presidente', 'Diretor(a)', "Guardiã(o)"].includes(localStorage.getItem("@role"));
    },
    showEditOrgModal() {
      return this.$store.state.page.modalContext === 'EDIT_ORG';
    },
  },

  methods: {
    ...mapActions({
      getUserInfo: 'userInfo',
      getAllOrganizations: 'getAllOrganizations', 
      updateOrganization: 'updateOrganization',
      deleteOrganization: 'deleteOrganization',
    }),

    configHeader() {
      this.$store.commit('SET_PAGE_CONTEXT', 'organizationManagement');
      this.$store.commit('SET_HEADER_TITLE', 'Gerenciamento de Organizações');
      this.$store.commit('SET_HEADER_BUTTON_VISIBILITY', false);
      this.$store.commit('SHOW_SIDEBAR', true);
    },

    getTitle() {
      return `Organizações - EJ: ${this.userInfo.sub?.ej?.name || '—'}`;
    },

    formatDate(row, column, prop) {
      return Utils.formatDate(prop);
    },

    handleOpenAddMember(org) {
      
      this.editableOrg = { ...org };
      this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'EDIT_ORG');
    },

    async handleDeleteOrganization(index, org) {
      ElMessageBox.confirm(
        `<b>Excluir organização?</b><br><br>
         <b>Nome:</b> ${org.name}<br>
         <b>Descrição:</b> ${org.description || '—'}`,
        'Atenção!',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'Excluir',
          cancelButtonText: 'Cancelar',
          type: 'warning',
        }
      ).then(async () => {
        try {
          await this.deleteOrganization({ organizationId: org._id });
          this.sendNotification({
            title: 'Tudo certo!',
            message: 'Organização removida com sucesso',
            type: 'success',
          });
          const data = await this.getAllOrganizations();
          if (data && data.status !== 500) this.organizations = data.organizations || [];
        } catch (err) {
          this.sendNotification({
            title: 'Erro',
            message: 'Falha ao remover organização.',
            type: 'error',
          });
        }
      });
    },

    async editOrganization() {
      try {
        await this.updateOrganization(this.editableOrg);

        this.sendNotification({
          title: 'Tudo certo!',
          message: `Organização atualizada com sucesso.`,
          type: 'success',
        });

        this.closeModal();
      } catch (error) {
        this.sendNotification({
          title: 'Erro',
          message: 'Falha ao atualizar organização.',
          type: 'error',
        });
      }
    },

    openModal(org) {
      this.editableOrg = {
        _id: org._id,
        name: org.name,
        description: org.description,
        members: org.members || []
      };
      this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'EDIT_ORG');
    },

    async closeModal() {
      this.closeModalWithoutRequest();

      const data = await this.getAllOrganizations();
      if (data && data.status !== 500) {
        this.organizations = data.organizations || [];
      };
    },

    closeModalWithoutRequest() {
      this.editableOrg = cloneDeep({ organization: models.emptyOrganization || {} });
      this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
    },

    sendNotification(notification) {
      ElNotification.closeAll();
      ElNotification(notification);
    }
  }
}
