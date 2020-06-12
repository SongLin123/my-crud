<!--
 * @Date: 2020-06-09 12:33:27
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-10 17:35:39
 * @FilePath: \d2-crud\src\components\renderCustomComponent.vue
-->
<script>
export default {
  name: 'render-custom-component',
  props: {
    /**
     * @description v-model双向绑定的值
     */
    value: {
      required: true
    },
    /**
     * @description 传入的组件名
     */
    componentName: {
      required: true
    },
    /**
     * @description 传入的自定义参数
     */
    props: {
      default: null
    },
    /**
     * @description 传入的行数据
     */
    scope: {
      default: null
    }
  },
  render (h) {
    let self = this
    return h(self.componentName, {
      props: {
        value: self.value,
        scope: self.scope,
        ...self.props
      },
      on: {
        input: function (event) {
          self.$emit('input', event)
        },
        customEmit (event) {
          self.$emit('handlecustom', event)
        },
      }
    })
  }
}
</script>
