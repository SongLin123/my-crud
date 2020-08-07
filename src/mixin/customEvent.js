/*
 * @Date: 2020-06-10 16:39:07
 * @LastEditors: songlin
 * @LastEditTime: 2020-08-07 15:15:52
 * @FilePath: \my-crud\src\mixin\customEvent.js
 */

export default {
  computed: {
  },
  methods: {
    prefix(name) {
      return "customComponents-" + name;
    },
    getRef(name) {
      return this.$refs['customComponents-'+name][0].$children[0]
    },
    handle(key, event) {
      this.$emit('componentEvent:' + key, event)
    }
  },

}
