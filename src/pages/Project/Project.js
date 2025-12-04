import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import { ElNotification, ElMessageBox } from 'element-plus'

export default {
    name: 'Project',

    async mounted() {
        this.configPage();

        this.sendNotification({
            title: 'Aguarde...',
            message: 'A coleta das informações do projeto pode levar alguns instantes',
            type: 'warning',
        });

        const project = await this.getProject();

        if(project) {
            this.project = project;
            this.customer = project.customer;

            this.sendNotification({
                title: 'Sucesso!',
                message: 'Informações do projeto coletadas',
                type: 'success',
            });
        } else {
            this.sendNotification({
                title: 'O projeto informado não existe',
                message: 'Você será redirecionado(a) para a Página de Projetos',
                type: 'warning',
            });

            setTimeout(() => {
                this.$router.push({ name: 'ProjectList' });
            }, "3000");
        }

    },

    data() {
        return {
            project: [],
            customer: []
        }
    },

    methods: {
        ...mapActions ({
            findProject: 'findProject'
        }),

        configPage() {
            this.$store.commit('SHOW_SIDEBAR', false);
        },

        handleClosePage() {
            this.$router.push({ name: 'ProjectList' });
        },

        async getProject() {
            const res = await this.findProject(this.$route.params.projectId);
            return res.project;
        },

        formatDate(prop) {
            return Utils.formatDate(prop);
        },

        copyLink() {
            let input = document.createElement("input");
            input.value = `${this.project.contractLink}`;
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

        copyEmail() {
            let input = document.createElement("input");
            input.value = `${this.customer.email}`;
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

        sendNotification(notification) {
            ElNotification.closeAll();
            ElNotification(notification);
        }
    }
}