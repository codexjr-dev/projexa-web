<template>
  <body>
    <div class="header">
      <img src='/src/assets/dashboard.png' alt="logo do projexa" class="logo">
      <h2 class="site-name">Projexa</h2>
    </div>
    <div class="body">
      <div class="body-box">
        <div class="body-text">
        <div>
          <h1>
            Bem-vindo, 
            <br>
            empresário júnior
          </h1>
        </div>
        <div>
          <p>
            O Projexa foi criado com o objetivo de auxiliar no gerenciamento da sua EJ, facilitando tarefas através de um
            ambiente integrado feito por juniores, para juniores.
          </p>
        </div>
      </div>
      <div class="login-body">
        <div class="login-box">
          <h2>
            Entre na sua
            <br>
            conta
          </h2>
          <form>
            <div class="input-box">
              <input required type="email" placeholder="Digite o email">
            </div>
            <div class="input-box">
              <input requerid type="password" placeholder="Digite a senha">
            </div>
            <button class="button-input">Entrar</button>
          </form>
        </div>
        <div class="register">
          <div class="">
            <span>Ainda não é cadastrado?</span>
          </div>
            <button class="button-register">Cadastrar EJ</button>
        </div>
      </div>
      </div>
    </div>
  </body>
</template>

<script>
import scriptModule from './Home.js';

export default {
  name: scriptModule.name,
  mounted: scriptModule.mounted,
  methods: scriptModule.methods,
}
</script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
