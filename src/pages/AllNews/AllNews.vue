<template lang="pug">
div.page
   div.content
      el-card
         el-table(
            :data="newsData"
            stripe
         )
            el-table-column(
               prop="project.name",
               label="Projeto",
               :width="200"
            )
            el-table-column(
               prop="description",
               label="Descrição",
               :width="350"
            )
            el-table-column(
               prop="member.name",
               label="Membro",
               :width="150"
            )
            el-table-column(
               prop="createdAt",
               label="Data de Postagem",
               :formatter="formatDate"
               :width="210"
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
                        @click="handleCopyLink(scope.$index, scope.row)"
                        :style="'background: #95D475'"
                     )
                        el-icon
                           CopyDocument()
                     div.actions-button(
                        @click="handleDownloadImage(scope.$index, scope.row)"
                        :style="'background: #75D4C9'"
                     )
                        el-icon
                           Download()
                     div.actions-button(
                        v-if="isLeadership || isNewsOwner(scope.row)"
                        @click="handleEditNews(scope.$index, scope.row)"
                        :style="'background: #4B53C6'"
                     )
                        el-icon
                           Edit()
                     div.actions-button(
                        v-if="isLeadership || isNewsOwner(scope.row)"
                        @click="handleDeleteNews(scope.$index, scope.row)"
                        :style="'background: #F89898'"
                     )
                        el-icon
                           DeleteFilled()
   el-dialog(
      center
      :before-close="closeModalWithoutRequest"
      :title="'Editar a atualização:'"
      @close="closeModal"
      v-model="showEditNewsModal"
   )
      add-news-modal(
         :titleModal='"Editar Atualização:"'
         :news="editableNews"
      )
      template(
         #footer
      )
         span.dialog-footer
            el-button(
               @click="editNews()"
               type="primary"
               color="#4b53c6"
            ) Salvar
</template>
      
<script>
import scriptModule from './AllNews.js';

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
@import './AllNews.scss';
</style>
      