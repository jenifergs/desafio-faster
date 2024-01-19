<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/logo2.png" alt="Logo" class="logo-header" />
    </div>
    <nav>
      <ul>
        <li><nuxt-link to="/products">Produtos</nuxt-link></li>
        <li><nuxt-link to="/liked-drinks">Meus favoritos</nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped src="../styles/header/Header.css"></style>