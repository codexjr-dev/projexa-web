import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import AdicionarLink from '@/components/modals/AdicionarLink.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
    name: 'Link',

    components: {
        AdicionarLink,
    },

    async mounted() {
        this.configHeader();

        this.sendNotification({
            title: 'Aguarde...',
            message: 'A coleta de membros pode levar alguns instantes',
            type: 'warning',
        });

        this.getLinks();

        this.sendNotification({
            title: 'Sucesso!',
            message: 'Lista de links coletada.',
            type: 'success',
        });
    },

    data() {
        return {
            invalid: false,
            validFields: {
                linkName: false,
                linkUrl: false,
                linkTags: false,
                linkDepartments: false,
            },
            dados: [],
            novoLink: cloneDeep(models.emptyLink),
            titleModal: 'Adicionar Link',
            isEditar: false,
            isVisualizar: false,
        };
    },

    computed: {
        showAddLinkModal() {
            return this.$store.state.page.modalContext === 'ADD_OR_EDIT_LINK';
        },
        isLeadership() {
            return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"));
        }
    },

    methods: {
        ...mapActions({
            findAllLinks: 'findAllLinks',
            createLink: 'createLink',
            deleteLink: 'deleteLink',
            updateLink: 'updateLink'
        }),

        setValidField(fieldName, value) {
            this.validFields[fieldName] = value;
        },

        isValid() {
            let isValid = true;
            Object.values(this.validFields).forEach(value => {
                if (!value) isValid = false;
            })
            this.invalid = !isValid
            return isValid;
        },

        configHeader() {
            this.$store.commit('SET_PAGE_CONTEXT', 'link');
            this.$store.commit('SET_HEADER_TITLE', 'Links');
            this.$store.commit('SET_HEADER_BUTTON_VISIBILITY', true);
            this.$store.commit('SHOW_SIDEBAR', true);
        },

        formatDate(row, column, prop) {
            return Utils.formatDate(prop);
        },

        formatList(row, column, prop) {
            return Utils.formatListToCard(row, column, prop);
        },

        async getLinks() {
            const res = await this.findAllLinks();
            this.dados = res.links;
        },

        handleEditar(index, row) {
            this.openModal(index, row, 'ADD_OR_EDIT_LINK');
            this.isVisualizar = false; this.isEditar = true;
            this.titleModal = 'Editar Link';
        },

        handleVisualizar(index, row) {
            this.openModal(index, row, 'ADD_OR_EDIT_LINK');
            this.isVisualizar = true; this.isEditar = false;
            this.titleModal = row.name;
        },

        handleExcluir(index, row) {
            ElMessageBox.confirm(
                `Excluir link ${row.name} do sistema?`,
                'Atenção',
                {
                   confirmButtonText: 'Excluir',
                   cancelButtonText: 'Cancelar',
                   type: 'warning',
                }
            ).then(async () => {
                await this.excluir(index, row);
            })
        },

        async salvar() {
            try {
                if (this.isValid()) {
                   const res = await this.createLink(this.novoLink);
                   this.sendNotification({
                      title: 'Tudo certo!',
                      message: `Link ${res.link.name} foi cadastrado com sucesso`,
                      type: 'success',
                    });
                   this.closeModal();
                }
            } catch (error) { }
        },

        async editar() {
            try {
                const res = await this.updateLink({
                   link: this.novoLink,
                   id: this.novoLink._id,
                });

                this.sendNotification({
                   title: 'Tudo certo!',
                   message: `${res.link.name} foi editado com sucesso`,
                   type: 'success',
                });

                this.closeModal();
            } catch (error) { }
        },

        async excluir(index, row) {
            try {
                await this.deleteLink(row._id);
                this.sendNotification({
                    title: 'Tudo certo!',
                    message: 'Link removido com sucesso',
                    type: 'success',
                });
                await this.getLinks();
            } catch (error) { }
        },

        copyNick(row) {
            let input = document.createElement("input");
            input.value = `${row.url}`;
            document.body.appendChild(input);
            input.select();

            document.execCommand('copy');
            document.body.removeChild(input);

            this.sendNotification({
                title: 'Tudo certo!',
                message: `Link copiado para a área de tranferência`,
                type: 'success',
            });
        },

        openModal(index, row, modal) {
            this.novoLink = row;
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', modal);
        },

        async closeModal() {
            this.closeModalWithoutRequest();
            await this.getLinks();
        },

        closeModalWithoutRequest() {
            this.isVisualizar = false;
            this.isEditar = false;
            this.titleModal = 'Adicionar Link';
            this.resetValidFields();
            this.invalid = false;
            this.novoLink = cloneDeep(models.emptyLink);
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', '');
        },

        sendNotification(notification) {
            ElNotification.closeAll();
            ElNotification(notification);
        },

        resetValidFields() {
            Object.keys(this.validFields).forEach(key => {
            this.setValidField(key, false);
            });
        }
    }
}