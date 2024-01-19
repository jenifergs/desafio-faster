<template>
  <div class="bg">
    <div class="div-1">
      <img src="../assets/logo.png" alt="" />

      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">
            <i class="fas fa-user text-white"></i>
          </label>
          <input id="email" v-model="email" type="text" placeholder="Email" />
        </div>

        <div class="input-group">
          <label for="password">
            <i class="fas fa-lock text-white"></i>
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Senha"
          />
        </div>

        <button type="submit" class="btn-login">Login</button>
      </form>
      <p>
        Não possui uma conta? Registre-se
        <nuxt-link to="/register"
          >Aqui <i class="fa-solid fa-martini-glass-citrus"></i
        ></nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { AuthApi } from '../services/AuthApi'
export default {
  data() {
    return {
      email: '',
      password: '',
      service: new AuthApi('http://localhost:3000'),
    }
  },
  methods: {
    async login() {
      try {
        const token = await this.service.login(this.email, this.password)
        if (token) {
          alert('Login realizado com sucesso')
          localStorage.setItem('token', token)
          this.$router.push('/products')
        } else {
          alert('Email ou senha incorretos')
        }
      } catch (error) {
        alert('Erro ao realizar login')
      }
    },
  },
}
</script>
<style scoped src="../styles/login/login.css"></style>
