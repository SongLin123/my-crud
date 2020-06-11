import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  props: {
    /**
     * @description dialog配置
     */
    formOptions: {
      type: Object,
      default: null
    },
    /**
     * @description dialog新增标题
     */
    addTitle: {
      type: String,
      default: '添加'
    },
    /**
     * @description dialog修改标题
     */
    editTitle: {
      type: String,
      default: '编辑'
    },
    /**
 * @description dialog查看标题
 */
    lookTitle: {
      type: String,
      default: '查看'
    },
    /**
     * @description 新增表单模板
     */
    addTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 修改表单模板
     */
    editTemplate: {
      type: Object,
      default: null
    },
    /**
    * @description 查看表单模板
    */
    lookTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 新增表单校验规则
     */
    addRules: {
      type: Object,
      default: null
    },
    /**
     * @description 编辑表单校验规则
     */
    editRules: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      /**
       * @description dialog显示与隐藏
       */
      isDialogShow: false,
      /**
       * @description 表单数据
       */
      formData: {},
      /**
       * @description 表单模式
       */
      formMode: 'edit',
      watchEditOpen: 0,
      /**
       * @description 编辑暂存数据，用于储存不在editTemplate中的数据
       */
      editDataStorage: {},
      /**
       * @description 新增表单模板暂存
       */
      addTemplateStorage: {},
      /**
       * @description 修改表单模板暂存
       */
      editTemplateStorage: {},
      /**
       * @description 查看暂存数据，用于储存不在editTemplate中的数据
       */
      lookDataStorage: {},
      /**
      * @description 查看表单模板暂存
      */
      lookTemplateStorage: {}
    }
  },
  methods: {
    /**
     * @description 保存行数据
     */
    handleDialogSave() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        let rowData = {}
        if (this.formMode === 'edit') {
          rowData = _clonedeep(this.editDataStorage)
          _forEach(this.formData, (value, key) => {
            this._set(rowData, key, value)
          })
          this.$emit('row-edit', {
            index: this.editIndex,
            row: rowData
          }, (param = null) => {
            if (param === false) {
              this.handleCloseDialog()
              return
            }
            this.handleDialogSaveDone({
              ...rowData,
              ...param
            })
          })
        } else if (this.formMode === 'add') {
          _forEach(this.formData, (value, key) => {
            this._set(rowData, key, value)
          })
          this.$emit('row-add', rowData, (param = null) => {
            if (param === false) {
              this.handleCloseDialog()
              return
            }
            this.handleDialogSaveDone({
              ...rowData,
              ...param
            })
          })
        } else {
          this.handleCloseDialog()
        }
      })
    },
    /**
     * @description 取消保存行数据
     */
    handleDialogCancel(done) {
      this.$emit('dialog-cancel', done)
    },
    /**
     * @description 保存完成
     */
    handleDialogSaveDone(rowData) {
      if (this.formMode === 'edit') {
        this.handleUpdateRow(this.editIndex, rowData)
        this.editDataStorage = {}
      } else if (this.formMode === 'add') {
        this.handleAddRow(rowData)
      }
      this.handleCloseDialog()
    },
    /**
     * @description 关闭模态框
     */
    handleCloseDialog() {
      this.isDialogShow = false
    }
  },
  // watch: {
  //   addTemplate: {
  //     handler(newV, oldV) {
  //       console.log(this.formMode)
  //       let data = {};
  //       // 对象键值排序
  //       let sortedObjKeys = Object.keys(newV).sort(function (a, b) {
  //         return newV[a]._sort - newV[b]._sort;
  //       });

  //       for (let key of sortedObjKeys) {
  //         data[key] = ""
  //       }
  //       // 保存已输入的值
  //       let formDataStorge = _clonedeep(this.formData);
  //       Object.keys(data).map(k => {
  //         data[k] = formDataStorge[k]
  //       })
  //       this.formData = _clonedeep(data);
  //       console.log("datatatat", this.formData)
  //       this.addTemplateStorage = _clonedeep(newV)
  //       // this.$refs.form.clearValidate();

  //     },
  //     deep: true,
  //   },
  //   editTemplate: {
  //     handler(newV, oldV) {
  //       console.log(this.formMode)
  //       let data = {};
  //       // 对象键值排序
  //       let sortedObjKeys = Object.keys(newV).sort(function (a, b) {
  //         return newV[a]._sort - newV[b]._sort;
  //       });
  //       for (let key of sortedObjKeys) {
  //         data[key] = ""
  //       }
  //       // 保存已输入的值
  //       let formDataStorge
  //       if (this.watchEditOpen === 0) {
  //         formDataStorge = _clonedeep(this.editDataStorage);
  //         this.watchEditOpen = 1;
  //       } else {
  //         formDataStorge = _clonedeep(this.formData);
  //       }
  //       Object.keys(data).map(k => {
  //         data[k] = formDataStorge[k]
  //       })
  //       this.formData = _clonedeep(data);
  //       this.editTemplateStorage = _clonedeep(newV)
  //       // this.$refs.form.clearValidate();

  //     },
  //     deep: true,
  //   },

  // },
}
