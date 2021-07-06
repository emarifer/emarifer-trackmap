<template>
  <v-app>
    <v-main>
      <MyMap />
    </v-main>
  </v-app>
</template>

<script>
  import MyMap from './views/MyMap';

  export default {
    name: 'App',

    components: {
      MyMap,
    },
  };
</script>
