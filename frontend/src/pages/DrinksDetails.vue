<template>
  <div>
    <Header />
    <div class="drink-details">
      <img :src="`http://localhost:3000/${drink.imageUrl}`" alt="Drink Image" />
      <div>
        <h1>{{ drink.name }}</h1>
        <p class="cod">Cód. 1887</p>
        <p>Categoria: {{ drink.categoryName }}</p>
        <p class="price">Preço: R${{ drink.price }},00</p>
        <div class="quantity-control">
          <button class="quantity-btn" @click="decreaseQuantity">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity">{{ quantity }}</span>
          <button class="quantity-btn" @click="increaseQuantity">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <button class="btn-cart">Adicionar ao Carrinho</button>
      </div>
    </div>
    <p class="drink-details-description">{{ drink.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  asyncData({ query }) {
    const drink = JSON.parse(query.drink as any)
    return { drink }
  },
  data() {
    return {
      quantity: 1,
    }
  },
  methods: {
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
  },
})
</script>

<style scoped src="../styles/products/DrinkDetails.css"></style>
