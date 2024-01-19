<template>
  <div>
    <form @submit.prevent="register" class="form-register">
      <img src="../assets/logo.png" alt="" class="logo-register" />
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="name" class="input-register" />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" class="input-register" />

      <label for="password">Senha:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="input-register"
      />

      <label for="birthday">Idade:</label>
      <input
        type="date"
        id="birthday"
        v-model="birthday"
        class="input-register"
      />

      <button type="submit" class="btn-register">Registrar</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { UsersApi } from '../services/UsersApi'

export default defineComponent({
  data() {
    return {
      name: '',
      email: '',
      password: '',
      birthday: null,
      service: new UsersApi('http://localhost:3000'),
    }
  },
  methods: {
    async register() {
      console.log('Registro realizado com sucesso!')
      const result = await this.service.createUser({
        name: this.name,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
      })
      if (result.user.id) {
        alert('Usuário criado com sucesso!')
        this.$router.push('/login')
      }
    },
  },
})
</script>
<style scoped src="../styles/register/RegisterForm.css"></style>
