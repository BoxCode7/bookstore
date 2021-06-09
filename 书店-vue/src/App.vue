<template>
  <div id="app">
        <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data(){
      return{

      }
  },
  mounted() {

  }
}
</script>

<style>

</style>
