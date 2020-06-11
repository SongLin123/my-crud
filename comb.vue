<!--
 * @Date: 2020-06-10 15:35:37
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-10 15:38:02
 * @FilePath: \d2-crud\comb.vue
-->
<template>
  <div>
    {{data}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      data:''
    }
  },
  methods:{
    handle(data){
      this.data=data
    }
  }
}
</script>
