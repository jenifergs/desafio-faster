
<template>
  <div class="container-register">
    <RegistrationForm />
  </div>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    RegistrationForm,
  },
});
</script>
<style scoped src="../styles/register/Register.css"></style>
