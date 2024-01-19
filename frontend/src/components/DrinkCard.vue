<template>
  <div class="drink-card">
    <label class="favorite-icon">
      <input type="checkbox" :checked="drink.isLiked" @change="handleLikeChange" />
      <i class="fas fa-heart circle-icon"></i>
    </label>
    <div class="drink-info">
      <div class="image-container">
        <img :src="`http://localhost:3000/${drink.imageUrl}`" :alt="drink.name" height="100" />

      </div>
    </div>
    <h2>{{ drink.name }}</h2>
    <p>Preço: <span class="span-price">R${{ drink.price }},</span>00</p>
    <button @click="navigateToDrinkInfo">Ver Detalhes</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DrinksApi } from '../services/DrinksApi'

const token = localStorage.getItem('token')
export default defineComponent({
  props: {
    drink: {
      type: Object as PropType<{
        categoryId: number
        categoryName: string
        description: string
        id: number
        name: string
        price: number
        imageUrl: string
        isLiked: boolean
      }>,
      required: true,
    },
  },
  data() {
    return {
      drinkS: this.drink,
      service: new DrinksApi('http://localhost:3000', token || ''),
    }
  },
  methods: {
    stringifyDrink() {
      return JSON.stringify(this.drinkS)
    },
    async navigateToDrinkInfo() {
      await this.$router.push({
        path: '/drink-details/' + this.drink.id,
        query: {
          drink: this.stringifyDrink(),
        },
      })
    },
    async handleLikeChange() {
      this.drinkS.isLiked = !this.drinkS.isLiked
      try {
        await this.service.toggleLikeDrink(this.drinkS.id)
        this.$emit('update:drink', { ...this.drinkS })
      } catch (error) {
        alert('Erro ao atualizar o like do drink')
        console.error('Erro na requisição: ', error)
      }
    },
  },
})
</script>
<style scoped src="../styles/products/DrinkCard.css"></style>