<!--
 * @Date: 2020-06-10 15:35:37
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-10 17:35:21
 * @FilePath: \d2-crud\coma.vue
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
        this.$emit("customEmit", 123);
      }
    }
  };
</script>
