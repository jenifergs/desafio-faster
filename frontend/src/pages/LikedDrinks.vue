<template>
  <div>
    <Header />
    <div class="card-list">
      <div v-for="drink in drinks" :key="drink.id">
        <DrinkCard :drink="drink" @update:drink="updateDrink" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import DrinkCard from '../components/DrinkCard.vue'
import { UsersApi } from '../services/UsersApi'
const token = localStorage.getItem('token')

export default defineComponent({
  data() {
    return {
      drinks: [],
      usersService: new UsersApi('http://localhost:3000', token),
    }
  },
  methods: {
    async getDrinks() {
      const drinks = await this.usersService.getLikedDrinks()
      this.drinks = drinks
    },
    updateDrink(updatedDrink) {
      const { id, isLiked } = updatedDrink
      if (!isLiked) {
        this.drinks = this.drinks.filter((drink) => drink.id !== id)
      }
    },
  },
  async mounted() {
    if (token === null) {
      this.$router.push('/login')
    }
    await this.getDrinks()
  },
})
</script>

<style scoped src="../styles/products/Products.css"></style>
