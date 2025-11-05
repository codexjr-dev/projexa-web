<template lang="pug">
div.modal-content
  div.col

    el-divider(
      content-position="left"
    ) <label className="required"> Nome </label>
    el-input(
			placeholder="Nome"
			v-model="link.name"
      @blur="validateAll(this.link.name, 'linkName')"
      :class="this.errorMessages['linkName'] ? 'required-field' : ''"
      :disabled="isToDisable"
    )
    el-text.verify(
      v-if="this.errorMessages['linkName']"
    ) {{ this.errorMessages['linkName'] }}

    el-divider(
      content-position="left"
    ) <label className="required"> URL </label>
    el-input(
			placeholder="URL"
			v-model="link.url"
      @blur="validateAll(this.link.url, 'linkUrl')"
      :class="this.errorMessages['linkUrl'] ? 'required-field' : ''"
      :disabled="isToDisable"
    )
    el-text.verify(
      v-if="this.errorMessages['linkUrl']"
    ) {{ this.errorMessages['linkUrl'] }}

    el-divider(
      content-position="left"
    ) <label className="required"> Tags </label>
    el-select(
			multiple
			collapse-tags
			collapse-tags-tooltip
      v-model="link.tags"
      placeholder="Selecione tags"
      value-key="id"
      @blur="validateList(this.link.tags, 'linkTags')"
      @change="validateList(this.link.tags, 'linkTags')"
      :class="this.errorMessages['linkTags'] ? 'required-field' : ''"
      :disabled="isToDisable"
    )
      el-option(
				v-for="tag in tags",
				:key="tag.id",
				:label="tag.value",
				:value="tag.value",
      )
    el-text.verify(
      v-if="this.errorMessages['linkTags']"
    ) {{ this.errorMessages['linkTags'] }}

    el-divider(
      content-position="left"
    ) <label className="required"> Departamentos </label>
    el-select(
			multiple
			collapse-tags
			collapse-tags-tooltip
      v-model="link.departments"
      placeholder="Selecione os departamentos"
      value-key="id"
      @blur="validateList(this.link.departments, 'linkDepartments')"
      @change="validateList(this.link.departments, 'linkDepartments')"
      :class="this.errorMessages['linkDepartments'] ? 'required-field' : ''"
      :disabled="isToDisable"
    )
      el-option(
				v-for="department in departments",
				:key="department._id",
				:label="department.value",
				:value="department.value"
      )
    el-text.verify(
      v-if="this.errorMessages['linkDepartments']"
    ) {{ this.errorMessages['linkDepartments'] }}
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
  name: 'AdicionarLink',

  props: {
    link: {
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
      default: false,
    },
  },

  watch: {
    invalid: {
      immediate: false,
      handler(newValue) {
        if(newValue) {
          this.validateAll(this.link.name, 'linkName');
          this.validateAll(this.link.url, 'linkUrl');
          this.validateList(this.link.tags, 'linkTags');
          this.validateList(this.link.departments, 'linkDepartments');
        }
      }
    },
  },

  data() {
    return {
      dados: [],
      errorMessages: {
        linkName: "",
        linkUrl: "",
        linkTags: "",
        linkDepartments: "",
      },
      tags: [
        {
          id: 1,
          value: 'Importante',
        },
        {
          id: 2,
          value: 'Treinamento',
        },
        {
          id: 3,
          value: 'Documentação',
        },
      ],
      departments: [
        {
          id: 1,
          value: 'Presidência'
        },
        {
          id: 2,
          value: 'Gente & Gestão'
        },
        {
          id: 3,
          value: 'Projetos'
        },
        {
          id: 4,
          value: 'Qualidade'
        },
        {
          id: 5,
          value: 'Marketing'
        },
        {
          id: 6,
          value: 'Negócios'
        }
      ],
    }
  },

  async mounted() {
    const res = await this.findAllLinks()
    this.links = res.links
  },

  methods: {
    ...mapActions({
      findAllLinks: 'findAllLinks',
      findById: 'findById',
    }),

    setFieldErrorMessage(fieldName, message) {
      this.errorMessages[fieldName] = message;
    },

    validateAll(field, fieldName) {
      if(!field || field.trim().length === 0) {
        this.setFieldErrorMessage(fieldName, '*Campo obrigatório');
        this.$emit("setValidField", fieldName, false);
      } else {
        this.setFieldErrorMessage(fieldName, "");
        this.$emit("setValidField", fieldName, true);
      }
    },

    validateList(field, fieldName) {
      if(!field || field.length === 0) {
        this.setFieldErrorMessage(fieldName, '*Campo obrigatório');
        this.$emit("setValidField", fieldName, false);
      } else {
        this.setFieldErrorMessage(fieldName, "");
        this.$emit("setValidField", fieldName, true);
      }
    },

  },
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
  gap: 0vh;
  flex: 1;
}
.message {
  margin-top: 21px;
}
.required:after {
  content: " *";
  color: #EB4C4F;
}
.required-field {
  --el-border-color: #EB4C4F;
}
.verify {
  color: #EB4C4F;
  margin-top: 5px;
  margin-left: 15px;
}
</style>
