<!--
 * @Date: 2020-06-09 14:07:21
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-09 16:44:10
 * @FilePath: \d2-crud\app.vue
-->
<template>
  <div id='app'>
    <d2-crud :columns="columns"></d2-crud>
  </div>
</template>
<script>
export default {
data() {
  return {
    columns: [
      {
        title: '照片',
        key: 'imageUrl',
        component: {
          name: 'imagecell'
        }
      },
      {
        title: '姓名',
        key: 'personName'
      },
      {
        title: '分组',
        key: 'groups',
        component: {
          name: 'tagGroup'
        }
      },
      {
        title: '性别',
        key: 'personSex',
        component: {
          name: 'optionsTag',
          props: {
            options: [{
              label: '男',
              value: '1'
            }, {
              label: '女',
              value: '2'
            }, {
              label: '其他',
              value: '3'
            }]
          }
        }
      },
      {
        title: '手机号',
        key: 'personTel'
      },

      {
        title: '工种',
        key: 'personType',
        component: {
          name: 'optionsTag',
          props: {
            options: this.personTypeOption
          }
        }
      }]
  }
},
}
</script>
