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
      :formOptions="formOptions"
      @form-data-change="handleFormDataChange"
      @dialog-open="handleDialogOpen"
      :add-rules="rules"
      :edit-rules="rules"
      @event:com-coma="handle"
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
      formOptions: {
        // lookNoEleLabelWidth: 100
      },
      order: 3,
      show: "",
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入名字",
            trigger: "blur"
          }
        ],

        lastUpdatedTime: [
          {
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ],
        remarksE: [
          {
            required: true,
            message: "请输入备注2",
            trigger: "blur"
          }
        ]
      },
      rowHandle: {
        minWidth: "180px",
        look: {
          text: "查看",
          emit: "lookHandle"
        },
        lookNoEle: {
          text: "纯文字查看",
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
      }
    };
  },
  computed: {
    addTemplate: {
      get() {
        return {
          roleName: {
            title: "角色名",
            value: "",
            class: "my_label",
            _sort: 1,
            component: {
              placeholder: " 仅可输入英文大小写、数字"
            }
          },
          remarks: {
            title: "备注",
            value: "",
            _sort: 2,
            _class: "gg",
            component: {
              placeholder: ""
            }
          },
          remarksE: {
            title: "备注2",
            value: "",
            _sort: 2,
            component: {
              show: this.show === 2
            }
          },
          mycom: {
            order: this.order,
            title: "自定义选择框",
            value: "",
            _sort: 3,
            component: {
              name: testCom,
              formatter(val) {
                return val === 1 ? "测试1" : "测试2";
              },
              props: {
                options: [
                  { label: "测试1", value: 1 },
                  { label: "测试2", value: 2 }
                ]
              }
            }
          },
          mycom2: {
            title: "自带选择框",
            value: "",
            _sort: 4,
            component: {
              name: "el-select",
              options: [
                { label: "测试1", value: 1 },
                { label: "测试2", value: 2 }
              ]
            }
          },
          lastUpdatedTime: {
            title: "修改时间",
            value: "",
            _sort: 5,
            component: {
              show: this.show === 1
            }
          }
        };
      },
      set(newV) {
        return newV;
      }
    }
  },

  methods: {
    handleEdit({ row }, done) {
      console.log(row);
    },
    handleAdd(data, done) {
      console.log(data);
    },
    // 表单打开
    handleDialogOpen({ mode, row }) {
      if (mode === "add") {
        this.show = "";
      }
      if (mode === "edit" || mode == "look") {
        if (row.mycom2 == 1) {
          this.show = 1;
          this.order = 2;
        } else {
          this.show = 2;
        }
      }
    },
    handleDialogCancel(done) {
      done();
    },
    addDevice() {
      this.$refs.d2Crud.showDialog({
        mode: "add"
      });
    },
    handleFormDataChange({ key, value }) {
      console.log(key);
      console.log(value);
      if (key == "mycom2") {
        if (value == 1) {
          this.show = 1;
          this.order = 2;
          console.log(this.addTemplate);
          // this.addTemplate = Object.assign(
          //   {},
          //   JSON.parse(JSON.stringify(this.addTemplate))
          // );
          // this.addTemplate = { ...this.addTemplate, ...this.newAdd };
          // let { remarksE, ...parmas } = this.addTemplate;
          // this.addTemplate = parmas;
        } else {
          this.show = 2;
          console.log(this.addTemplate);

          // this.addTemplate = { ...this.addTemplate, ...this.newAdd2 };
          // let { lastUpdatedTime, ...parmas } = this.addTemplate;
          // this.addTemplate = parmas;
        }
      }
    }
  },
  mounted() {
    console.log(this.addTemplate);
  }
};
</script>
