/*
 * @Date: 2020-06-10 16:39:07
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-10 18:16:24
 * @FilePath: \d2-crud\src\mixin\customEvent.js
 */
// function mapRefs(map) {
//   let arr={}
//   for (const key in map) {
//     if (map.hasOwnProperty(key)) {
//       const value = map[key];
//       if (key.includes('com-')) {
//         let name=key.split(/com-/)[1]
//         arr[name]=value[0]
//       }
//     }
//   }
//   return arr
// }

export default {
  computed: {
  },
  methods: {
    getRef(name) {
      return this.$refs['com-'+name][0].$children[0]
    },
    handle(key, event) {
      this.$emit('event:com-' + key, event)
    }
  },

}
