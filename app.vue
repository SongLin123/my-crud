<!--
 * @Date: 2020-06-09 14:07:21
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-09 18:25:25
 * @FilePath: \d2-crud\app.vue
-->
<template>
  <div id='app'>
    <d2-crud :columns="columns" :data="data" :rowHandle="rowHandle"></d2-crud>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            title: '手机号',
            key: 'personTel'
          },

        ],
        rowHandle: {
          columnHeader: '编辑表格',
          edit: {
            text: '编辑',
            size: 'small',
            sort: 3
          },
          remove: {
            text: '删除',
            size: 'small',
            sort: 4

          },
          custom: [
            {
              text: '自1',
              type: 'warning',
              sort: -1,
              size: 'small',
            },
            {
              text: '自2',
              type: 'warning',
              sort: 6,
              size: 'small',
            }
          ]
        },
        data: [
          { personTel: '13333333' }
        ]
      }
    },
  }
</script>
