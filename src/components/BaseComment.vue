<template>
  <article class="base-comment">
     <h3 class="name">{{ name }}</h3>
        <a
          :href="`mailto:${email}`"
          target="_blank"
        >
          {{ email }}
        </a>
      <p v-html="body" />
  </article>
</template>

<script>
export default {
  name: 'BaseComment',
  props: {
    name: String,
    email: String,
    body: String
  }
}
</script>

<style scoped>
  .base-comment {
    padding-bottom: 40px;
    border-radius: 5px;
    color: var(--text-color);
  }

  .base-comment a {
    color: var(--link-color);
    text-decoration: none;
  }

  .name {
    font-weight: bold;
    font-size: 16px;
  }
</style>
