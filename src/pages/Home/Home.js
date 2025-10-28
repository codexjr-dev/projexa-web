export default {
    name: 'Home',
  
    mounted() {
      this.$store.commit('SHOW_SIDEBAR', false)
    },
  
    methods: {
      cadastrarEj() {
        this.$router.push({ name: 'Cadastro' })
      },
      entrar() {
        this.$router.push({ name: 'Login' })
      },
    }
  }