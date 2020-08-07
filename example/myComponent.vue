<template>
  <el-select v-model="deviceStatus" @change="change" placeholder="设备状态" :disabled="disabled">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array
    },
    disabled: Boolean
  },
  data() {
    return {
      deviceStatus: this.value
    };
  },
  methods: {
    change(val) {
      this.$emit("input", this.deviceStatus);
    }
  },
  mounted() {}
};
</script>