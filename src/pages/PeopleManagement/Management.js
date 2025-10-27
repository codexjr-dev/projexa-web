export default {
  name: "PeopleManagement",

  data() {
    return {
      form: {
        name: "",
        role: "",
        email: ""
      },
      submitted: false
    };
  },

  methods: {
    handleSubmit() {
      this.submitted = true;

      console.log("Dados cadastrados:", this.form);

      this.form.name = "";
      this.form.role = "";
      this.form.email = "";
    }
  }
};
