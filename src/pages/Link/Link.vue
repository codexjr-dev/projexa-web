<template>
   <div>
      <el-card>
         <el-table :data="dados" stripe>
            <el-table-column prop="name" label="Nome" />
            <el-table-column prop="url" label="URL" />
            <el-table-column prop="departments" label="Departamentos" :formatter="formatList">
               <template v-slot="scope">
                  <div v-for="(prop, index) in scope.row.departments" :key="index">
                     <div> {{ index + 1 }}) {{ prop }} </div>
                  </div>
               </template>
            </el-table-column>
            <el-table-column prop="tags" label="Tags" :formatter="formatList">
               <template v-slot="scope">
                  <div v-for="(prop, index) in scope.row.tags" :key="index">
                     <div> {{ index + 1 }}) {{ prop }} </div>
                  </div>
               </template>
            </el-table-column>
            <el-table-column label="Ações" align="right">
               <template #default="scope">
                  <div class="actions">
                     <div class="actions-button" @click="copyNick(scope.row)" style="background: #409eff">
                        <el-icon> <CopyDocument /> </el-icon>
                     </div>
                     <div class="actions-button" v-if="isLeadership" @click="handleEditar(scope.$index, scope.row)" style="background: #4b53c6">
                        <el-icon> <Edit /> </el-icon>
                     </div>
                     <div class="actions-button" @click="handleVisualizar(scope.$index, scope.row)" style="background: #67c23a">
                        <el-icon> <View /> </el-icon>
                     </div>
                     <div class="actions-button" v-if="isLeadership" @click="handleExcluir(scope.$index, scope.row)" style="background: #e07c72">
                        <el-icon> <DeleteFilled /> </el-icon>
                     </div>
                  </div>
               </template>
            </el-table-column>
         </el-table>
      </el-card>

      <el-dialog :before-close="closeModalWithoutRequest" :title="titleModal" @close="closeModal" v-model="showAddLinkModal">
         <adicionar-link :titleModal='titleModal' :isVisualizar="isVisualizar" :invalid="invalid" 
            :link="novoLink" 
            @set-valid-field="setValidField" 
         />
         <template #footer>
            <span class="dialog-footer">
               <el-button v-if="!isVisualizar" @click="isEditar ? editar() : salvar()" type="primary" color="#4b53c6"> 
                  Salvar
               </el-button>
            </span>
         </template>
      </el-dialog>
   </div>
</template>

<script>
   import scriptModule from './Link.js'

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
   @import './Link.scss';
</style>