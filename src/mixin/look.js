import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
    data() {
        return {
            /**
             * @description 被查看行的索引
             */
            lookIndex: 0
        }
    },
    methods: {
        /**
         * @description 查看行数据
         * @param {Number} index 行所在索引
         * @param {Object} row 行数据
         */
        handleLook(index, row, templage = null) {
            this.formMode = 'look'
            this.lookDataStorage = _clonedeep(row)
            this.isDialogShow = true
            this.$emit('dialog-open', {
                mode: 'look',
                row
            })
            this.lookIndex = index
            if (templage) {
                this.formData = _clonedeep(templage)
                this.lookTemplateStorage = _clonedeep(templage)
            } else {
                this.formData = this.lookTemplate ? _clonedeep(this.lookTemplate) : {}
                this.lookTemplateStorage = this.lookTemplate ? _clonedeep(this.lookTemplate) : {}
            }
            _forEach(this.formData, (value, key) => {
                this.formData[key] = row.hasOwnProperty(key) ? row[key] : (this.formData[key] || '')
            })
        }
    }
}
