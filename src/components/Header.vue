<template lang="pug">
div.header
   span.title-header {{ title }}
   el-button(
      v-if="isLeadership && isToShow"
      @click="openModal"
   )
      span {{ textButton }}
      div
         el-icon
         plus
</template>

<script>
export default {
   name: 'Header',

   props: {},

   computed: {
      isUser() {
         return this.$store.state.page.context === 'user'
      },
      isProject() {
         return this.$store.state.page.context === 'project'
      },
      isLink() {
         return this.$store.state.page.context === 'link'
      },
      isAllNews() {
         return this.$store.state.page.context === 'allnews'
      },
      isLeadership() {
         return ["Presidente", "Diretor(a)", "Guardiã(o)"].includes(
            localStorage.getItem("@role")
         );
      },
      isToShow() {
         return this.$store.state.page.header.buttonVisibility;
      },

      title() {
         return this.$store.state.page.header.title;
      },

      textButton() {
         if (this.isUser) {
            return 'Adicionar membro'
         } else if (this.isProject) {
            return 'Adicionar projeto'
         } else if (this.isLink) {
            return 'Adicionar link'
         }
      },
   },

   methods: {
      openModal() {
         if (this.isUser) {
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_OR_EDIT_USER')
         } else if (this.isProject) {
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_OR_EDIT_PROJECT')
         } else if (this.isLink) {
            this.$store.commit('SET_AND_SHOW_MODAL_CONTEXT', 'ADD_OR_EDIT_LINK')
         }
      }
   },
}
</script>

<style lang="scss" scoped>
.header {
   height: 15vh;
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 90vw;
   margin-left: 10vw;

   .title-header {
      font-weight: bold;
      font-size: 2rem;
      color: #808080;
      margin-left: 5%;
   }

   .el-button {
      margin-right: 5%;
      width: 15%;
   }

   .logoffSize {
      position: absolute;
      left: 65%;
   }

}
</style>
