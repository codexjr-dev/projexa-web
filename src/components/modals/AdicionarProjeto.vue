<template lang="pug">
div.modal-content
   div.col
      el-row
         el-divider(
            content-position="left"
         ) <label className="required"> Nome </label>
         el-input(
            placeholder="Nome"
            v-model="projeto.name"
            @blur="validate(this.projeto.name, 'projectName')"
            :class="this.errorMessages['projectName'] ? 'required-field' : ''"
            :disabled="isToDisable"
         )
         el-text.verify(
            v-if="this.errorMessages['projectName']"
         ) {{ this.errorMessages['projectName'] }}
      el-row
         el-divider(
            content-position="left"
         ) <label className="required"> Descrição </label>
         el-input(
            placeholder="Descrição"
            v-model="projeto.description"
            @blur="validate(this.projeto.description, 'projectDescription')"
            :class="this.errorMessages['projectDescription'] ? 'required-field' : ''"
               :disabled="isToDisable"
            )
         el-text.verify(
            v-if="this.errorMessages['projectDescription']"
         ) {{ this.errorMessages['projectDescription'] }}
      div.date-pickers
         div.col
            el-divider(
               content-position="left"
               style="margin-bottom: 10px"
            ) <label className="required"> Data de início </label>
            div(:class="this.errorMessages['projectStartDate'] ? 'required-field' : ''")
               el-date-picker(
                  placeholder="Data de início"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  v-model="projeto.startDate"
                  @blur="validate(this.projeto.startDate, 'projectStartDate')"
                  @change="validate(this.projeto.startDate, 'projectStartDate')"
                  :disabled="isToDisable"
               )
               div.message
                  el-text.verify(
                     v-if="this.errorMessages['projectStartDate']"
                  ) {{ this.errorMessages['projectStartDate'] }}
         div.col
            el-divider(
               content-position="left"
               style="margin-bottom: 10px"
            ) <label className="required"> Data de término </label>
            div(:class="this.errorMessages['projectFinishDate'] ? 'required-field' : ''")
               el-date-picker(
                  placeholder="Data de finalização"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  v-model="projeto.finishDate"
                  @blur="validate(this.projeto.finishDate, 'projectFinishDate')"
                  @change="validate(this.projeto.finishDate, 'projectFinishDate')"
                  :disabled="isToDisable"
               )
               div.message
                  el-text.verify(
                     v-if="this.errorMessages['projectFinishDate']"
                  ) {{ this.errorMessages['projectFinishDate'] }}
      el-row
         el-divider(
            content-position="left"
         ) <label className="required"> Tags </label>
         el-select(
            multiple
            v-model="projeto.tags"
            placeholder="Selecione tags"
            value-key="id"
            @blur="validateList(this.projeto.tags, 'projectTags')"
            @change="validateList(this.projeto.tags, 'projectTags')"
            :class="this.errorMessages['projectTags'] ? 'required-field' : ''"
            :disabled="isToDisable"
         )
            el-option(
               v-for="tag in tags",
               :key="tag.id",
               :label="tag.value",
               :value="tag.value"
            )
         el-text.verify(
            v-if="this.errorMessages['projectTags']"
         ) {{ this.errorMessages['projectTags'] }}
   div.col
      el-row
         el-divider(
            content-position="left"
         ) <label className="required"> Time </label>
         el-select(
            multiple
            v-model="projeto.team"
            placeholder="Selecione o time"
            value-key="id"
            @blur="validateList(this.projeto.team, 'projectTeam')"
            @change="validateList(this.projeto.team, 'projectTeam')"
            :class="this.errorMessages['projectTeam'] ? 'required-field' : ''"
            :disabled="isToDisable"
            :fit-input-width="true"
         )
            el-option(
               v-for="user in users",
               :key="user._id",
               :label="user.name",
               :value="user._id"
            )
         el-text.verify(
            v-if="this.errorMessages['projectTeam']"
         ) {{ this.errorMessages['projectTeam'] }}
      el-row
         el-divider(
            content-position="left"
         ) <label className="required"> Link do contrato </label>
         el-input(
            placeholder="Link do contrato"
            v-model="projeto.contractLink"
            @blur="validate(this.projeto.contractLink, 'projectContractLink')"
            :class="this.errorMessages['projectContractLink'] ? 'required-field' : ''"
            :disabled="isToDisable"
            )
         el-text.verify(
            v-if="this.errorMessages['projectContractLink']"
         ) {{ this.errorMessages['projectContractLink'] }}
      el-row
         el-divider(
            content-position="left"
         ) <label className="required"> Contato do cliente </label>
         el-input(
            placeholder="Contato do cliente"
            v-model="projeto.customer.contact"
            @blur="validate(this.projeto.customer.contact, 'customerPhone')"
               :class="this.errorMessages['customerPhone'] ? 'required-field' : ''"
            v-mask="['(##)#####-####']"
            :disabled="isToDisable"
            )
         el-text.verify(
            v-if="this.errorMessages['customerPhone']"
         ) {{ this.errorMessages['customerPhone'] }}
      el-row
         el-divider(
            content-position="left"
         ) <label className="required"> Email do cliente </label>
         el-input(
            placeholder="Email do cliente"
            v-model="projeto.customer.email"
            :disabled="isVisualizar"
            )
      el-row
         el-divider(
            content-position="left"
         ) Nome do cliente
         el-input(
            placeholder="Nome do cliente"
            v-model="projeto.customer.name"
            @blur="validate(this.projeto.customer.name, 'customerName')"
            :class="this.errorMessages['customerName'] ? 'required-field' : ''"
            :disabled="isToDisable"
            )
         el-text.verify(
            v-if="this.errorMessages['customerName']"
         ) {{ this.errorMessages['customerName'] }}
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
   name: 'AdicionarProjeto',

   props: {
      projeto: {
         type: Object,
         required: true,
      },
      isVisualizar: {
         type: Boolean,
         required: false,
         default: false,
      },
      invalid: {
         type: Boolean,
         required: false,
         default: false
      },
   },

   watch: {
      invalid: {
         immediate: false,
         handler(newValue) {
            if (newValue) {
               this.validate(this.projeto.name, 'projectName');
               this.validate(this.projeto.description, 'projectDescription');
               this.validate(this.projeto.contractLink, 'projectContractLink');
               this.validate(this.projeto.startDate, 'projectStartDate');
               this.validate(this.projeto.finishDate, 'projectFinishDate');
               this.validateList(this.projeto.tags, 'projectTags');
               this.validateList(this.projeto.team, 'projectTeam');
               this.validate(this.projeto.customer.contact, 'customerPhone');
               this.validate(this.projeto.customer.name, 'customerName');
            }
         }
      }
   },

   data() {
      return {
         customDatePicker: {
            boundariesPadding: 0,
            gpuAcceleration: false
         },
         dados: [],
         errorMessages: {
            projectName: "",
            projectContractLink: "",
            projectDescription: "",
            projectStartDate: "",
            projectFinishDate: "",
            projectTags: "",
            projectTeam: "",
            customerName: "",
            customerPhone: "",
         },
         tags: [
            {
               id: 1,
               value: 'Backend',
            },
            {
               id: 2,
               value: 'Frontend',
            },
            {
               id: 3,
               value: 'Mobile',
            },
            {
               id: 4,
               value: 'Wordpress',
            },
            {
               id: 5,
               value: 'Assessoria',
            },
            {
               id: 6,
               value: 'Treinamento',
            }
         ],
         users: []
      }
   },

   async mounted() {
      const res = await this.findAllUsers()
      this.users = res.users
   },

   methods: {
      ...mapActions({
         findAllUsers: 'findAllUsers',
         findById: 'findById',
      }),

      setFieldErrorMessage(fieldName, message) {
         this.errorMessages[fieldName] = message;
      },

      validate(field, fieldName) {
         if (!field || field.trim().length == 0) {
            this.$emit('setValidField', fieldName, false);
            this.setFieldErrorMessage(fieldName, "* Campo obrigatório");
         } else {
            this.$emit('setValidField', fieldName, true);
            this.setFieldErrorMessage(fieldName, "");
         }
      },

      validateList(list, fieldName) {
         if (!list || list.length == 0) {
            this.$emit('setValidField', fieldName, false);
            this.setFieldErrorMessage(fieldName, "* Campo obrigatório");
         } else {
            this.$emit('setValidField', fieldName, true);
            this.setFieldErrorMessage(fieldName, "");
         }
      }
   },

   computed: {
      isLeadership() {
         return ['Presidente', 'Diretor(a)', "Guardiã(o)"].includes(localStorage.getItem("@role"));
      },
      isToDisable() {
         return this.isVisualizar || !this.isLeadership;
      },
   }
}
</script>

<style lang="scss" scoped>
.modal-content {
   display: flex;
   gap: 2%;
   justify-content: center;
}

.col {
   display: flex;
   flex-direction: column;
   gap: 2vh;
   flex: 1;
}

.date-pickers {
   display: flex;
   gap: 2%;
   margin-bottom: 1vh;
}

.message {
   margin-top: 21px;
}

.required-field {
   --el-border-color: #EB4C4F;
}

.required:after {
   content: " *";
   color: #EB4C4F;
}

.verify {
   color: #EB4C4F;
   margin-top: 5px;
   margin-left: 15px;
}
</style>
