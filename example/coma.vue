<!--
 * @Date: 2020-06-10 15:35:37
 * @LastEditors: songlin
 * @LastEditTime: 2020-08-07 15:49:13
 * @FilePath: \my-crud\example\coma.vue
-->
<template>
  <div>
    <el-button @click.stop="up">up123</el-button>
  </div>
</template>
<script>
  export default {
    methods: {
      up() {
        this.$emit("componentEvent", 123);
      }
    }
  };
</script>
