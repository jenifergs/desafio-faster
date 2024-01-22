<template>
  <div class="container-products">
    <Header />
    <section class="section-search">
      <input
        type="text"
        v-model="searchName"
        placeholder="Pesquisar por nome"
        class="search-products"
      />

      <select v-model="selectedCategory" class="selected-category">
        <option value="">Todas as categorias</option>
        <option
          v-for="category in drinkCategories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <button @click="search" class="btn-search">Buscar</button>
    </section>
    <div class="card-list">
      <div v-for="drink in drinks" :key="drink.id">
        <DrinkCard :drink="drink" @update:drink="updateDrink" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { DrinksApi } from '../services/DrinksApi'
import { DrinksCategoriesApi } from '../services/DrinksCategoriesApi'
import Header from '../components/Header.vue'
import DrinkCard from '../components/DrinkCard.vue'

const token = localStorage.getItem('token')

export default defineComponent({
  data() {
    return {
      searchName: '',
      selectedCategory: '',
      drinks: [],
      drinkCategories: [],
      drinksService: new DrinksApi('http://localhost:3000', token),
      drinksCaretoriesService: new DrinksCategoriesApi(
        'http://localhost:3000',
        token
      ),
    }
  },
  methods: {
    async getDrinks() {
      const drinks = await this.drinksService.getDrinks()
      this.drinks = drinks
    },
    async getDrinkCategories() {
      const categories = await this.drinksCaretoriesService.getDrinkCategories()
      this.drinkCategories = categories
    },
    async search() {
      try {
        if (this.selectedCategory && this.searchName) {
          const drinks = await this.drinksService.searchDrinksInCategory(
            this.selectedCategory,
            this.searchName
          )
          this.drinks = drinks
        } else if (this.selectedCategory) {
          const drinks = await this.drinksService.getDrinksInCategory(
            this.selectedCategory
          )
          this.drinks = drinks
        } else if (this.searchName) {
          const drinks = await this.drinksService.searchDrinks(this.searchName)
          this.drinks = drinks
        } else {
          this.getDrinks()
        }
      } catch (error) {
        alert('Erro ao carregar produtos')
        if (token === null) {
          this.$router.push('/login')
        }
      }
    },
    updateDrink(updatedDrink) {
      return;
    },
  },
  async mounted() {
    try {
      await this.getDrinks()
      await this.getDrinkCategories()
    } catch (error) {
      alert('Erro ao carregar produtos')
      if (token === null) {
        this.$router.push('/login')
      }
    }
  },
})
</script>
<style scoped src="../styles/products/Products.css"></style>
