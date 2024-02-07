<template>
  <Login />
  <router-view></router-view>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    Login: defineAsyncComponent(() => import('remote/Login')),
  },
};
</script>