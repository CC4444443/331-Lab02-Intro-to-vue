<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>

    <h3>
      It looks like you're experiencing some network issues, please take a breath and
      <a href="#" @click.prevent="$router.go(-1)">click here</a> to try again.
    </h3>
  </div>
</template>

<style scoped>
 .networkError {
  padding: 2rem;
  text-align: center;
 }
 .networkError h1 {
  margin-bottom: 0.5rem;
 }
 .networkError h3 {
  color: #666;
 }
</style>
