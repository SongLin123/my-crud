<!--
 * @Date: 2020-06-09 14:07:21
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-10 18:03:17
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
      @row-add="handleAdd"
      @row-edit="handleEdit"
      @dialog-cancel="handleDialogCancel"
      @event:com-coma="handle"
    >
      <template #header>
        <el-button
          type="primary"
          style="margin-bottom: 5px"
          @click="addDevice"
        >新增设备</el-button>
      </template>
    </d2-crud>
  </div>
</template>
<script>
  import testCom from "./myComponent";
  import coma from "./coma";
  import comb from "./comb";

  export default {
    data() {
      return {
        formOptions: {
          // lookNoEleLabelWidth: 100
        },
        rowHandle: {
          minWidth: "180px",
          look: {
            text: "查看",
            emit: "lookHandle",
            sort: 3
          },
          lookNoEle: {
            text: "纯文字查看",
            emit: "lookHandle"
          },
          edit: {
            text: "编辑",
            emit: "editHandle",
            type: "warning ",
            sort: 1
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
            mycom: 1,
            mycom2: 2
          },
          {
            roleName: "角色2",
            createdTime: "时间2",
            lastUpdatedTime: "修改时间2",
            remarks: "备注2",
            mycom: 2,
            mycom2: 1
          }
        ],
        addTemplate: {
          roleName: {
            title: "角色名",
            value: "",
            component: {
              name: "el-input-number",
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
              props: {
                options: [
                  { label: "测试1", value: 1 },
                  { label: "测试2", value: 2 }
                ]
              }
            }
          },
          coma: {
            title: "a",
            value: "",
            component: {
              name: coma
            }
          },
          comb: {
            title: "b",
            value: "",
            component: {
              name: comb
            }
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
      handle(data) {
        this.$refs.d2Crud.getRef("comb").handle(data);
      },
      addDevice() {
        this.$refs.d2Crud.showDialog({
          mode: "add"
        });
      }
    }
  };
</script>
