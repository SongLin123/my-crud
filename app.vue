<!--
 * @Date: 2020-06-09 14:07:21
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-09 16:44:10
 * @FilePath: \d2-crud\app.vue
-->
<template>
  <div id="app">
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      add-title="新增考勤规则"
      :add-template="addTemplate"
      :edit-template="addTemplate"
      :look-template="addTemplate"
      @row-edit="handleEdit"
      @dialog-cancel="handleDialogCancel"
    >
      <template #header>
        <el-button type="primary" style="margin-bottom: 5px" @click="addDevice">新增设备</el-button>
      </template>
    </d2-crud>
  </div>
</template>
<script>
import testCom from "./myComponent";
export default {
  data() {
    return {
      rowHandle: {
        minWidth: "180px",
        look: {
          text: "查看",
          emit: "lookHandle"
        },
        edit: {
          text: "编辑",
          emit: "editHandle",
          type: "warning "
        },
        remove: {
          icon: "el-icon-remove",
          text: "删除",
          align: "right",
          confirm: true
        }
      },

      columns: [
        {
          title: "角色名",
          key: "roleName"
        },
        {
          title: "创建时间",
          key: "createdTime"
        },
        {
          title: "修改时间",
          key: "lastUpdatedTime"
        },
        {
          title: "备注",
          key: "remarks"
        }
      ],
      data: [
        {
          roleName: "角色1",
          createdTime: "时间1",
          lastUpdatedTime: "修改时间1",
          remarks: "备注1",
          mycom: 1
        },
        {
          roleName: "角色2",
          createdTime: "时间2",
          lastUpdatedTime: "修改时间2",
          remarks: "备注2",
          mycom: 2
        }
      ],
      addTemplate: {
        roleName: {
          title: "角色名",
          value: "",
          component: {
            span: 12,
            placeholder: " 仅可输入英文大小写、数字"
          }
        },
        remarks: {
          title: "描述",
          value: "",
          component: {
            placeholder: ""
          }
        },
        mycom: {
          title: "选择框",
          value: "",
          component: {
            name: testCom,
            props: {
              options: [
                { label: "测试1", value: 1 },
                { label: "测试2", value: 2 }
              ]
            }
          }
        },
        lastUpdatedTime: {
          title: "权限设置",
          value: ""
          // component: {
          //   name: roleCheck
          // }
        }
      }
    };
  },
  methods: {
    handleEdit({ row }, done) {},
    handleAdd(data, done) {},
    handleDialogCancel(done) {
      done();
    },
    addDevice() {
      this.$refs.d2Crud.showDialog({
        mode: "add"
      });
    }
  }
};
</script>
