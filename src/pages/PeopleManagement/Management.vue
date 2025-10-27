<template>
  <div class="management-container">
    <h1>People Management</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input id="name" v-model="form.name" type="text" placeholder="Digite o nome" required />
      </div>

      <div class="form-group">
        <label for="role">Cargo:</label>
        <input id="role" v-model="form.role" type="text" placeholder="Digite o cargo" required />
      </div>

      <div class="form-group">
        <label for="email">E-mail:</label>
        <input id="email" v-model="form.email" type="email" placeholder="Digite o e-mail" required />
      </div>

      <button type="submit">Cadastrar</button>
    </form>

    <div v-if="submitted" class="success-message">
      ✅ Pessoa cadastrada com sucesso!
    </div>
  </div>
</template>

<script src="./Management.js"></script>
<style lang="scss" src="./Management.scss"></style>
