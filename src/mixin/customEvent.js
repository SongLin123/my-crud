/*
 * @Date: 2020-06-10 16:39:07
 * @LastEditors: songlin
 * @LastEditTime: 2020-08-07 15:39:53
 * @FilePath: \my-crud\src\mixin\customEvent.js
 */

export default {
  computed: {
  },
  methods: {
    filterBindPrefix(attr) {
      let keys = Object.keys(attr).filter(name => name.startsWith(":"))
      return keys.map(oldkey => {
        let newkey = oldkey.split(':')[1]

        return { [newkey]: attr[oldkey] }
      })
    },
    filterEventPrefix(attr) {
      let keys = Object.keys(attr).filter(name => name.startsWith("@"))
      return keys.map(oldkey => {
        let newkey=oldkey.split('@')[1]
        return { [newkey]: attr[oldkey] }
      })
    },
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
