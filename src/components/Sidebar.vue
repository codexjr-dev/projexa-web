<template lang="pug">
div.sidebar
   div.user-info
      span(v-html="userData")
   div.sidebar-button(
      :style="isMember ? 'background: #4b53c6' : 'background: #e6e6e6'"
      @click="handleOption('member')"
      title="Membros"
      aria-label="Membros"
   )
      el-icon
         user-filled(:style="isMember ? 'color: white' : 'color: #808080'")
      span(v-if="!isMember") Membros
   div.sidebar-button(
      :style="isProject ? 'background: #4b53c6' : 'background: #e6e6e6'"
      @click="handleOption('project')"
      title="Projetos"
      aria-label="Projetos"
   )
      el-icon
         files(:style="isProject ? 'color: white' : 'color: #808080'")
      span(v-if="!isProject") Projetos
   div.sidebar-button(
      :style="isLink ? 'background: #4b53c6' : 'background: #e6e6e6'"
      @click="handleOption('link')"
      title="Links"
      aria-label="Links"
   )
      el-icon
         connection(:style="isLink ? 'color: white' : 'color: #808080'")
      span(v-if="!isLink") Links
   div.sidebar-button(
      :style="isAllNews ? 'background: #4b53c6' : 'background: #e6e6e6'"
      @click="handleOption('allnews')"
      title="Atualizações"
      aria-label="Atualizações"
   )
      el-icon
         list(:style="isAllNews ? 'color: white' : 'color: #808080'")
      span(v-if="!isAllNews") Atualizações
   div.sidebar-button(
      :style="isForm ? 'background: #4b53c6' : 'background: #e6e6e6'"
      @click="handleOption('forms')"
      title="Formulários"
      aria-label="Formulários"
   )
      el-icon
         document(:style="isForm ? 'color: white' : 'color: #808080'")
      span(v-if="!isForm") Formulários
   div.sidebar-button(
      v-if="isLeadership"
      :style="isSettings ? 'background: #4b53c6' : 'background: #e6e6e6'"
      @click="handleNotifyUnderDevelopment('settings')"
      title="Configurações"
      aria-label="Configurações"
   )
      el-icon
         setting(:style="isSettings ? 'color: white' : 'color: #808080'")
      span(v-if="!isSettings") Configurações
   div.sidebar-button#logoff-button(
      @click="logoff"
      title="Sair"
      aria-label="Sair"
   )
      el-icon
         SwitchButton#logoff-icon()
      span() Sair
</template>

<script>
import { mapActions } from 'vuex'
import { ElNotification } from 'element-plus'

export default {
   name: 'Sidebar',

   data() {
      return {
         userData: {}
      }
   },

   computed: {
      isMember() {
         return this.$store.state.page.context === 'member'
      },
      isProject() {
         return this.$store.state.page.context === 'project'
      },
      isLink() {
         return this.$store.state.page.context === 'link'
      },
      isSettings() {
         return this.$store.state.page.context === 'settings'
      },
      isAllNews() {
         return this.$store.state.page.context === 'allnews'
      },
      isForm() {
         return this.$store.state.page.context === 'management'
      },
      isLeadership() {
         return ['Presidente', 'Diretor(a)', "Guardiã(o)"].includes(localStorage.getItem("@role"))
      }
   },

   async mounted() {
      this.userData = await this.getUserInfo()
   },

   methods: {
      ...mapActions({
         userInfo: 'userInfo'
      }),

      handleOption(context) {
         this.$store.commit('SET_PAGE_CONTEXT', context);
         
         const routes = {
            member: 'Member',
            project: 'ProjectList',
            link: 'Link',
            settings: 'Settings',
            allnews: 'AllNews',
            form: 'Management',
            forms: 'Management' // Adicione a rota correspondente aqui
         };
         
         if (routes[context]) {
            this.$router.push({ name: routes[context] });
         }
      },

      handleNotifyUnderDevelopment() {
         ElNotification.closeAll();
         ElNotification({
            title: 'Operação não realizada.',
            message: 'Essa funcionalidade está em desenvolvimento.',
            type: 'info',
         })
      },

      async getUserInfo() {
         const info = await this.userInfo();

         if (!info)
            return '';

         const formattedName = info.sub.name.split(' ');
         return `<strong>${formattedName[0]} ${formattedName[1] || ''}</strong>, ${info.sub.role} da ${info.sub.ej.name}`;
      },

      logoff() {
         localStorage.clear()
         this.$router.push({ name: 'Home' })
      },
   }
}
</script>

<style lang="scss" scoped>
.sidebar {
   width: 10vw;
   height: 100vh;
   position: fixed;
   background: #ecf0f3;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 2%;

   .user-info {
      text-align: center;
      position: fixed;
      top: 2%;
      width: inherit;
   }

   .sidebar-button {
      background: #e6e6e6;
      height: 10%;
      width: 65%;
      font-size: 60%;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }

   .sidebar-button:hover {
      cursor: pointer;
   }

   #logoff-button {
      bottom: 02%;
      position: absolute;
      width: 45%;
      height: 10%;
      background: #e6e6e6;
   }

   .el-icon {
      width: 30%;
      height: 52%;

      svg {
         height: 3em;
         width: 3em;
         color: #808080;
      }
   }

   span {
      color: #808080;
   }
}
</style>