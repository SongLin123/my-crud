<template>
  <div
    class="d2-crud"
    v-loading="loading"
    :element-loading-text="
      loadingOptions ? handleAttribute(loadingOptions.text, null) : null
    "
    :element-loading-spinner="
      loadingOptions ? handleAttribute(loadingOptions.spinner, null) : null
    "
    :element-loading-background="
      loadingOptions ? handleAttribute(loadingOptions.background, null) : null
    "
  >
    <div class="d2-crud-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="d2-crud-body">
      <el-table
        ref="elTable"
        :data="d2CrudData"
        v-bind="options"
        @current-change="handleCurrentChange"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDblclick"
        @row-click="handleRowClick"
        @row-contextmenu="handleRowContextmenu"
        @row-dblclick="handleRowDblclick"
        @header-click="handleHeaderClick"
        @header-contextmenu="handleHeaderContextmenu"
      >
        <el-table-column
          v-if="selectionRow || selectionRow === ''"
          type="selection"
          :label="handleAttribute(selectionRow.title, '')"
          v-bind="selectionRow"
        ></el-table-column>
        <el-table-column
          v-if="indexRow || indexRow === ''"
          type="index"
          :label="handleAttribute(indexRow.title, '')"
          v-bind="indexRow"
        ></el-table-column>
        <!-- 暂不使用d2-column递归组件，有bug -->
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :label="handleAttribute(item.title, '')"
          :prop="handleAttribute(item.key, null)"
          v-bind="item"
        >
          <template slot-scope="scope">
            <el-input
              v-if="item.component && item.component.name === 'el-input'"
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-input>
            <el-input-number
              v-else-if="
                item.component && item.component.name === 'el-input-number'
              "
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-input-number>
            <el-radio-group
              v-else-if="item.component && item.component.name === 'el-radio'"
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            >
              <template v-if="item.component.buttonMode">
                <el-radio-button
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                  >{{ option.label }}</el-radio-button
                >
              </template>
              <template v-else>
                <el-radio
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                  >{{ option.label }}</el-radio
                >
              </template>
            </el-radio-group>
            <el-checkbox-group
              v-else-if="
                item.component && item.component.name === 'el-checkbox'
              "
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            >
              <template v-if="item.component.buttonMode">
                <el-checkbox-button
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                  >{{ option.label }}</el-checkbox-button
                >
              </template>
              <template v-else>
                <el-checkbox
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                  >{{ option.label }}</el-checkbox
                >
              </template>
            </el-checkbox-group>
            <el-select
              v-else-if="item.component && item.component.name === 'el-select'"
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            >
              <el-option
                v-for="option in item.component.options"
                :key="option.value"
                v-bind="option"
              ></el-option>
            </el-select>
            <el-cascader
              v-else-if="
                item.component && item.component.name === 'el-cascader'
              "
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-cascader>
            <el-switch
              v-else-if="item.component && item.component.name === 'el-switch'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-switch>
            <el-slider
              v-else-if="item.component && item.component.name === 'el-slider'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-slider>
            <el-time-select
              v-else-if="
                item.component && item.component.name === 'el-time-select'
              "
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-time-select>
            <el-time-picker
              v-else-if="
                item.component && item.component.name === 'el-time-picker'
              "
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-time-picker>
            <el-date-picker
              v-else-if="
                item.component && item.component.name === 'el-date-picker'
              "
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-date-picker>
            <el-rate
              v-else-if="item.component && item.component.name === 'el-rate'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-rate>
            <el-color-picker
              v-else-if="
                item.component && item.component.name === 'el-color-picker'
              "
              v-model="scope.row[item.key]"
              v-bind="
                $d2CrudSize
                  ? Object.assign({ size: $d2CrudSize }, item.component)
                  : item.component
              "
              @change="
                $emit('cell-data-change', {
                  rowIndex: scope.$index,
                  key: item.key,
                  value: scope.row[item.key],
                  row: scope.row
                })
              "
            ></el-color-picker>
            <render-custom-component
              v-else-if="item.component && item.component.name"
              v-model="scope.row[item.key]"
              :component-name="item.component.name"
              :props="item.component.props ? item.component.props : null"
              :scope="scope"
            ></render-custom-component>
            <render-component
              v-else-if="item.component && item.component.render"
              :render-function="item.component.render"
              :scope="scope"
            ></render-component>
            <template v-else>{{
              item.formatter
                ? item.formatter(
                    scope.row,
                    scope.column,
                    _get(scope.row, item.key),
                    scope.$index
                  )
                : _get(scope.row, item.key)
            }}</template>
          </template>
          <template v-if="item.children">
            <el-table-column
              v-for="(item2, index2) in item.children"
              :key="index2"
              :label="handleAttribute(item2.title, '')"
              :prop="handleAttribute(item2.key, null)"
              v-bind="item2"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="item2.component && item2.component.name === 'el-input'"
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-input>
                <el-input-number
                  v-else-if="
                    item2.component &&
                      item2.component.name === 'el-input-number'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-input-number>
                <el-radio-group
                  v-else-if="
                    item2.component && item2.component.name === 'el-radio'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                >
                  <template v-if="item2.component.buttonMode">
                    <el-radio-button
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-radio-button
                    >
                  </template>
                  <template v-else>
                    <el-radio
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-radio
                    >
                  </template>
                </el-radio-group>
                <el-checkbox-group
                  v-else-if="
                    item2.component && item2.component.name === 'el-checkbox'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                >
                  <template v-if="item2.component.buttonMode">
                    <el-checkbox-button
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-checkbox-button
                    >
                  </template>
                  <template v-else>
                    <el-checkbox
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-checkbox
                    >
                  </template>
                </el-checkbox-group>
                <el-select
                  v-else-if="
                    item2.component && item2.component.name === 'el-select'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                >
                  <el-option
                    v-for="option in item2.component.options"
                    :key="option.value"
                    v-bind="option"
                  ></el-option>
                </el-select>
                <el-cascader
                  v-else-if="
                    item2.component && item2.component.name === 'el-cascader'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-cascader>
                <el-switch
                  v-else-if="
                    item2.component && item2.component.name === 'el-switch'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="item2.component"
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-switch>
                <el-slider
                  v-else-if="
                    item2.component && item2.component.name === 'el-slider'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="item2.component"
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-slider>
                <el-time-select
                  v-else-if="
                    item2.component && item2.component.name === 'el-time-select'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-time-select>
                <el-time-picker
                  v-else-if="
                    item2.component && item2.component.name === 'el-time-picker'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-time-picker>
                <el-date-picker
                  v-else-if="
                    item2.component && item2.component.name === 'el-date-picker'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-date-picker>
                <el-rate
                  v-else-if="
                    item2.component && item2.component.name === 'el-rate'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="item2.component"
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-rate>
                <el-color-picker
                  v-else-if="
                    item2.component &&
                      item2.component.name === 'el-color-picker'
                  "
                  v-model="scope.row[item2.key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item2.component)
                      : item2.component
                  "
                  @change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item2.key,
                      value: scope.row[item2.key],
                      row: scope.row
                    })
                  "
                ></el-color-picker>
                <render-custom-component
                  v-else-if="item2.component && item2.component.name"
                  v-model="scope.row[item2.key]"
                  :component-name="item2.component.name"
                  :props="item2.component.props ? item2.component.props : null"
                  :scope="scope"
                ></render-custom-component>
                <render-component
                  v-else-if="item2.component && item2.component.render"
                  :render-function="item2.component.render"
                  :scope="scope"
                ></render-component>
                <template v-else>{{
                  item2.formatter
                    ? item2.formatter(
                        scope.row,
                        scope.column,
                        _get(scope.row, item2.key),
                        scope.$index
                      )
                    : _get(scope.row, item2.key)
                }}</template>
              </template>
              <template v-if="item2.children">
                <el-table-column
                  v-for="(item3, index3) in item2.children"
                  :key="index3"
                  :label="handleAttribute(item3.title, '')"
                  :prop="handleAttribute(item3.key, null)"
                  v-bind="item3"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-if="
                        item3.component && item3.component.name === 'el-input'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-input>
                    <el-input-number
                      v-else-if="
                        item3.component &&
                          item3.component.name === 'el-input-number'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-input-number>
                    <el-radio-group
                      v-else-if="
                        item3.component && item3.component.name === 'el-radio'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    >
                      <template v-if="item3.component.buttonMode">
                        <el-radio-button
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                          >{{ option.label }}</el-radio-button
                        >
                      </template>
                      <template v-else>
                        <el-radio
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                          >{{ option.label }}</el-radio
                        >
                      </template>
                    </el-radio-group>
                    <el-checkbox-group
                      v-else-if="
                        item3.component &&
                          item3.component.name === 'el-checkbox'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    >
                      <template v-if="item3.component.buttonMode">
                        <el-checkbox-button
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                          >{{ option.label }}</el-checkbox-button
                        >
                      </template>
                      <template v-else>
                        <el-checkbox
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                          >{{ option.label }}</el-checkbox
                        >
                      </template>
                    </el-checkbox-group>
                    <el-select
                      v-else-if="
                        item3.component && item3.component.name === 'el-select'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    >
                      <el-option
                        v-for="option in item3.component.options"
                        :key="option.value"
                        v-bind="option"
                      ></el-option>
                    </el-select>
                    <el-cascader
                      v-else-if="
                        item3.component &&
                          item3.component.name === 'el-cascader'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-cascader>
                    <el-switch
                      v-else-if="
                        item3.component && item3.component.name === 'el-switch'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="item3.component"
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-switch>
                    <el-slider
                      v-else-if="
                        item3.component && item3.component.name === 'el-slider'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="item3.component"
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-slider>
                    <el-time-select
                      v-else-if="
                        item3.component &&
                          item3.component.name === 'el-time-select'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-time-select>
                    <el-time-picker
                      v-else-if="
                        item3.component &&
                          item3.component.name === 'el-time-picker'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-time-picker>
                    <el-date-picker
                      v-else-if="
                        item3.component &&
                          item3.component.name === 'el-date-picker'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-date-picker>
                    <el-rate
                      v-else-if="
                        item3.component && item3.component.name === 'el-rate'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="item3.component"
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-rate>
                    <el-color-picker
                      v-else-if="
                        item3.component &&
                          item3.component.name === 'el-color-picker'
                      "
                      v-model="scope.row[item3.key]"
                      v-bind="
                        $d2CrudSize
                          ? Object.assign(
                              { size: $d2CrudSize },
                              item3.component
                            )
                          : item3.component
                      "
                      @change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item3.key,
                          value: scope.row[item3.key],
                          row: scope.row
                        })
                      "
                    ></el-color-picker>
                    <render-custom-component
                      v-else-if="item3.component && item3.component.name"
                      v-model="scope.row[item3.key]"
                      :component-name="item3.component.name"
                      :props="
                        item3.component.props ? item3.component.props : null
                      "
                      :scope="scope"
                    ></render-custom-component>
                    <render-component
                      v-else-if="item3.component && item3.component.render"
                      :render-function="item3.component.render"
                      :scope="scope"
                    ></render-component>
                    <template v-else>{{
                      item3.formatter
                        ? item3.formatter(
                            scope.row,
                            scope.column,
                            _get(scope.row, item3.key),
                            scope.$index
                          )
                        : _get(scope.row, item3.key)
                    }}</template>
                  </template>
                  <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
                </el-table-column>
              </template>
              <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
            </el-table-column>
          </template>
          <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
        </el-table-column>
        <!-- <d2-column :columns="columns"></d2-column> -->
        <el-table-column
          v-if="rowHandle"
          :label="handleAttribute(rowHandle.columnHeader, '操作')"
          v-bind="rowHandle"
          class-name="rowHandle"
        >
          <template slot-scope="scope">
            <template>
              <el-button
                class="btn"
                :style="{ order: rowHandle.edit.sort || 100 }"
                v-if="
                  rowHandle.edit &&
                    rowHandle.edit.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.edit.show,
                      scope.$index,
                      scope.row
                    )
                "
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.edit.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.edit)
                    : rowHandle.edit
                "
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                class="btn"
                :style="{ order: rowHandle.edit.sort || 100 }"
                v-if="
                  rowHandle.edit &&
                    !rowHandle.edit.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.edit.show,
                      scope.$index,
                      scope.row
                    )
                "
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.edit.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.edit)
                    : rowHandle.edit
                "
                @click="handleEdit(scope.$index, scope.row)"
                >{{ handleAttribute(rowHandle.edit.text, '编辑') }}</el-button
              >
            </template>
            <template>
              <el-button
                class="btn"
                :style="{ order: rowHandle.remove.sort || 100 }"
                v-if="
                  rowHandle.remove &&
                    rowHandle.remove.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.remove.show,
                      scope.$index,
                      scope.row
                    )
                "
                :type="handleAttribute(rowHandle.remove.type, 'danger')"
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.remove.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.remove)
                    : rowHandle.remove
                "
                @click="handleRemove(scope.$index, scope.row)"
              ></el-button>
              <el-button
                class="btn"
                :style="{ order: rowHandle.remove.sort || 100 }"
                v-if="
                  rowHandle.remove &&
                    !rowHandle.remove.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.remove.show,
                      scope.$index,
                      scope.row
                    )
                "
                :type="handleAttribute(rowHandle.remove.type, 'danger')"
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.remove.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.remove)
                    : rowHandle.remove
                "
                @click="handleRemove(scope.$index, scope.row)"
                >{{ handleAttribute(rowHandle.remove.text, '删除') }}</el-button
              >
            </template>
            <template>
              <el-button
                class="btn"
                :style="{ order: rowHandle.look.sort || 100 }"
                v-if="
                  rowHandle.look &&
                    rowHandle.look.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.look.show,
                      scope.$index,
                      scope.row
                    )
                "
                :type="handleAttribute(rowHandle.look.type, '')"
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.look.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.look)
                    : rowHandle.look
                "
                @click="handleLook(scope.$index, scope.row)"
              ></el-button>
              <el-button
                class="btn"
                :style="{ order: rowHandle.look.sort || 100 }"
                v-if="
                  rowHandle.look &&
                    !rowHandle.look.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.look.show,
                      scope.$index,
                      scope.row
                    )
                "
                :type="handleAttribute(rowHandle.look.type, '')"
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.look.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.look)
                    : rowHandle.look
                "
                @click="handleLook(scope.$index, scope.row)"
                >{{ handleAttribute(rowHandle.look.text, '查看') }}</el-button
              >
            </template>
            <!-- 纯文字查看 -->
            <template>
              <el-button
                class="btn"
                :style="{ order: rowHandle.lookNoEle.sort || 100 }"
                v-if="
                  rowHandle.lookNoEle &&
                    rowHandle.lookNoEle.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.lookNoEle.show,
                      scope.$index,
                      scope.row
                    )
                "
                :type="handleAttribute(rowHandle.lookNoEle.type, '')"
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.lookNoEle.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.lookNoEle)
                    : rowHandle.lookNoEle
                "
                @click="handleLook(scope.$index, scope.row)"
              ></el-button>
              <el-button
                class="btn"
                :style="{ order: rowHandle.lookNoEle.sort || 100 }"
                v-if="
                  rowHandle.lookNoEle &&
                    !rowHandle.lookNoEle.circle &&
                    handleRowHandleButtonShow(
                      rowHandle.lookNoEle.show,
                      scope.$index,
                      scope.row
                    )
                "
                :type="handleAttribute(rowHandle.lookNoEle.type, '')"
                :disabled="
                  handleRowHandleButtonDisabled(
                    rowHandle.lookNoEle.disabled,
                    scope.$index,
                    scope.row
                  )
                "
                v-bind="
                  $d2CrudSize
                    ? Object.assign({ size: $d2CrudSize }, rowHandle.lookNoEle)
                    : rowHandle.lookNoEle
                "
                @click="handleLookNoEle(scope.$index, scope.row)"
                >{{
                  handleAttribute(rowHandle.lookNoEle.text, '查看')
                }}</el-button
              >
            </template>
            <template v-for="item in handleAttribute(rowHandle.custom, [])">
              <template>
                <el-button
                  class="btn"
                  :key="item.text"
                  :style="{ order: item.sort || 100 }"
                  v-if="
                    !item.more &&
                      item.circle &&
                      handleRowHandleButtonShow(
                        item.show,
                        scope.$index,
                        scope.row
                      )
                  "
                  :disabled="
                    handleRowHandleButtonDisabled(
                      item.disabled,
                      scope.$index,
                      scope.row
                    )
                  "
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item)
                      : item
                  "
                  @click="
                    $emit(item.emit, { index: scope.$index, row: scope.row })
                  "
                ></el-button>
                <el-button
                  class="btn"
                  :key="item.text"
                  :style="{ order: item.sort }"
                  v-if="
                    !item.more &&
                      !item.circle &&
                      handleRowHandleButtonShow(
                        item.show,
                        scope.$index,
                        scope.row
                      )
                  "
                  :disabled="
                    handleRowHandleButtonDisabled(
                      item.disabled,
                      scope.$index,
                      scope.row
                    )
                  "
                  v-bind="
                    $d2CrudSize
                      ? Object.assign({ size: $d2CrudSize }, item)
                      : item
                  "
                  @click="
                    $emit(item.emit, { index: scope.$index, row: scope.row })
                  "
                  >{{ item.text }}</el-button
                >
                <!-- 更多的下拉按钮 -->
                <el-popover

                  placement="bottom"
                  trigger="click"
                  :key="item.text"
                  :style="{ order: item.sort }"
                  v-if="
                    item.more &&
                      !item.circle &&
                      handleRowHandleButtonShow(
                        item.show,
                        scope.$index,
                        scope.row
                      )
                  "
                  :disabled="
                    handleRowHandleButtonDisabled(
                      item.disabled,
                      scope.$index,
                      scope.row
                    )
                  "

                >
                  <div class="hover">
                    <div
                      v-for="line in item.more"
                      :key="line.text"
                      v-show="
                        handleRowHandleButtonShow(
                          line.show,
                          scope.$index,
                          scope.row
                        )
                      "
                      @click="
                        $emit(
                          line.emit,
                          { index: scope.$index, row: scope.row },
                          $event
                        )
                      "
                    >
                      {{ line.text }}
                    </div>
                  </div>

                  <el-button
                    slot="reference"
                    class="btn"
                    v-bind="
                      $d2CrudSize
                        ? Object.assign({ size: $d2CrudSize }, item)
                        : item
                    "
                    @click="e => e.stopPropagation()"
                    >{{ item.text }}<i class="el-icon-arrow-down"></i
                  ></el-button>
                </el-popover>
              </template>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="d2-crud-pagination" v-if="pagination">
      <el-pagination
        v-bind="pagination"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        @prev-click="handlePaginationPrevClick"
        @next-click="handlePaginationNextClick"
      ></el-pagination>
    </div>
    <el-dialog
      v-if="isDialogShow"
      :title="
        (formMode === 'edit' && editTitle) ||
          (formMode === 'add' && addTitle) ||
          ((formMode === 'look' || formMode === 'lookNoEle') && lookTitle)
      "
      :width="
        (formMode === 'edit' && editWidth) ||
          (formMode === 'add' && addWidth) ||
          ((formMode === 'look' || formMode === 'lookNoEle') && lookWidth)
      "
      :visible.sync="isDialogShow"
      :before-close="handleDialogCancel"
      v-bind="formOptions"
    >
      <el-form
        ref="form"
        :model="formData"
        :rules="handleFormRulesMode()"
        v-bind="formOptions"
      >
        <el-row v-bind="formOptions" v-if="formMode !== 'lookNoEle'">
          <template v-for="(value, key, index) in formData">
            <el-col
              v-if="
                handleFormTemplateMode(key).component
                  ? handleAttribute(
                      handleFormTemplateMode(key).component.show,
                      true
                    )
                  : true
              "
              :span="
                handleFormTemplateMode(key).component
                  ? handleAttribute(
                      handleFormTemplateMode(key).component.span,
                      24
                    )
                  : 24
              "
              :offset="
                handleFormTemplateMode(key).component
                  ? handleAttribute(
                      handleFormTemplateMode(key).component.offset,
                      0
                    )
                  : 0
              "
              :key="index"
              :class="[handleFormTemplateMode(key)._class]"
              :style="{
                order: handleFormTemplateMode(key).order
                  ? handleFormTemplateMode(key).order
                  : 1
              }"
            >
              <el-form-item
                :label="handleFormTemplateMode(key).title"
                :prop="key"
              >
                <el-input
                  :ref="prefix(key)"
                  v-if="
                    !handleFormTemplateMode(key).component ||
                      (!handleFormTemplateMode(key).component.name &&
                        !handleFormTemplateMode(key).component.render) ||
                      handleFormTemplateMode(key).component.name === 'el-input'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-input>
                <el-input-number
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name ===
                      'el-input-number'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-input-number>
                <el-radio-group
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name === 'el-radio'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                >
                  <template
                    v-if="handleFormTemplateMode(key).component.buttonMode"
                  >
                    <el-radio-button
                      v-for="option in handleFormTemplateMode(key).component
                        .options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-radio-button
                    >
                  </template>
                  <template v-else>
                    <el-radio
                      v-for="option in handleFormTemplateMode(key).component
                        .options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-radio
                    >
                  </template>
                </el-radio-group>
                <el-checkbox-group
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name === 'el-checkbox'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                >
                  <template
                    v-if="handleFormTemplateMode(key).component.buttonMode"
                  >
                    <el-checkbox-button
                      v-for="option in handleFormTemplateMode(key).component
                        .options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-checkbox-button
                    >
                  </template>
                  <template v-else>
                    <el-checkbox
                      v-for="option in handleFormTemplateMode(key).component
                        .options"
                      :key="option.value"
                      :label="option.value"
                      >{{ option.label }}</el-checkbox
                    >
                  </template>
                </el-checkbox-group>
                <!-- 解决选择框 form-data-change 事件无法正确传递到父组件的问题-->
                <el-select
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name === 'el-select'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                >
                  <el-option
                    v-for="option in handleFormTemplateMode(key).component
                      .options"
                    :key="option.value"
                    v-bind="option"
                  ></el-option>
                </el-select>
                <el-cascader
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name === 'el-cascader'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-cascader>
                <el-switch
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name === 'el-switch'
                  "
                  v-model="formData[key]"
                  v-bind="handleFormTemplateMode(key).component"
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-switch>
                <el-slider
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name === 'el-slider'
                  "
                  v-model="formData[key]"
                  v-bind="handleFormTemplateMode(key).component"
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-slider>
                <el-time-select
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name ===
                      'el-time-select'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-time-select>
                <el-time-picker
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name ===
                      'el-time-picker'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-time-picker>
                <el-date-picker
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name ===
                      'el-date-picker'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-date-picker>
                <el-rate
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name === 'el-rate'
                  "
                  v-model="formData[key]"
                  v-bind="handleFormTemplateMode(key).component"
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-rate>
                <el-color-picker
                  :ref="prefix(key)"
                  v-else-if="
                    handleFormTemplateMode(key).component.name ===
                      'el-color-picker'
                  "
                  v-model="formData[key]"
                  v-bind="
                    $d2CrudSize
                      ? Object.assign(
                          { size: $d2CrudSize },
                          handleFormTemplateMode(key).component
                        )
                      : Object.assign(
                          {},
                          ...filterBindPrefix(
                            handleFormTemplateMode(key).component
                          )
                        )
                  "
                  :disabled="formMode === 'look'"
                  v-on="
                    Object.assign(
                      {
                        change: val => {
                          $emit('form-data-change', { key: key, value: val })
                        }
                      },
                      ...filterEventPrefix(
                        handleFormTemplateMode(key).component
                      )
                    )
                  "
                ></el-color-picker>
                <render-custom-component
                  v-else-if="handleFormTemplateMode(key).component.name"
                  v-model="formData[key]"
                  :component-name="handleFormTemplateMode(key).component.name"
                  :props="
                    handleFormTemplateMode(key).component.props &&
                    formMode === 'look'
                      ? Object.assign(
                          { disabled: true },
                          handleFormTemplateMode(key).component.props
                        )
                      : handleFormTemplateMode(key).component.props &&
                        formMode !== 'look'
                      ? handleFormTemplateMode(key).component.props
                      : null
                  "
                  :ref="prefix(key)"
                  @componentEvent="handle(key, event)"
                ></render-custom-component>
                <render-component
                  v-else-if="handleFormTemplateMode(key).component.render"
                  :render-function="
                    handleFormTemplateMode(key).component.render
                  "
                  :ref="prefix(key)"
                  :scope="formData[key]"
                ></render-component>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <!-- 纯文字查看 -->
        <el-row v-bind="formOptions" v-if="formMode === 'lookNoEle'">
          <template v-for="(value, key, index) in formData">
            <el-col
              v-if="
                handleFormTemplateMode(key).component
                  ? handleAttribute(
                      handleFormTemplateMode(key).component.show,
                      true
                    )
                  : true
              "
              :span="
                handleFormTemplateMode(key).component
                  ? handleAttribute(
                      handleFormTemplateMode(key).component.span,
                      24
                    )
                  : 24
              "
              :offset="
                handleFormTemplateMode(key).component
                  ? handleAttribute(
                      handleFormTemplateMode(key).component.offset,
                      0
                    )
                  : 0
              "
              :key="index"
            >
              <div :prop="key" class="look_n_content">
                <span
                  :class="['look_n_label', handleFormTemplateMode(key).class]"
                  v-text="handleFormTemplateMode(key).title"
                  :style="{
                    display: 'inline-block',
                    width: formOptions.lookNoEleLabelWidth + 'px'
                  }"
                ></span>
                <span
                  v-if="handleFormTemplateMode(key).component"
                  v-text="
                    handleFormTemplateMode(key).component.formatter
                      ? handleFormTemplateMode(key).component.formatter(
                          formData[key]
                        )
                      : formData[key]
                  "
                  :class="['look_n_val', handleFormTemplateMode(key).class]"
                  :style="{
                    display: 'inline-block',
                    width: formOptions.lookNoEleValWidth + 'px'
                  }"
                ></span>
                <span
                  v-else-if="!handleFormTemplateMode(key).component"
                  v-text="formData[key]"
                  :class="['look_n_val', handleFormTemplateMode(key).class]"
                  :style="{
                    display: 'inline-block',
                    width: formOptions.lookNoEleValWidth + 'px'
                  }"
                ></span>
              </div>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div slot="footer" v-if="formMode !== 'look' || formMode !== 'lookNoEle'">
        <el-button
          :size="
            formOptions
              ? handleAttribute(formOptions.cancelButtonSize, null)
              : null
          "
          :type="
            formOptions
              ? handleAttribute(formOptions.cancelButtonType, null)
              : null
          "
          :icon="
            formOptions
              ? handleAttribute(formOptions.cancelButtonIcon, null)
              : null
          "
          :loading="
            formOptions
              ? handleAttribute(formOptions.cancelLoading, false)
              : false
          "
          @click="isDialogShow = false"
          >{{
            formOptions
              ? handleAttribute(formOptions.cancelButtonText, '取消')
              : '取消'
          }}</el-button
        >
        <el-button
          :size="
            formOptions
              ? handleAttribute(formOptions.saveButtonSize, null)
              : null
          "
          :type="
            formOptions
              ? handleAttribute(formOptions.saveButtonType, null)
              : null
          "
          :icon="
            formOptions
              ? handleAttribute(formOptions.saveButtonIcon, null)
              : null
          "
          :loading="
            formOptions
              ? handleAttribute(formOptions.saveLoading, false)
              : false
          "
          @click="handleDialogSave"
          >{{
            formOptions
              ? handleAttribute(formOptions.saveButtonText, '确定')
              : '确定'
          }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import base from './mixin/base'
import handleRow from './mixin/handleRow'
import data from './mixin/data'
import edit from './mixin/edit'
import add from './mixin/add'
import look from './mixin/look'
import remove from './mixin/remove'
import dialog from './mixin/dialog'
import pagination from './mixin/pagination'
import exposeMethods from './mixin/exposeMethods.js'
import utils from './mixin/utils'
import customEvent from './mixin/customEvent'
import renderComponent from './components/renderComponent.vue'
import renderCustomComponent from './components/renderCustomComponent.vue'
import Vue from 'vue'
// import d2Column from './components/d2-column.vue'

export default {
  name: 'd2-crud',
  mixins: [
    base,
    data,
    handleRow,
    edit,
    add,
    look,
    remove,
    dialog,
    pagination,
    exposeMethods,
    utils,
    customEvent
  ],
  components: {
    renderComponent,
    renderCustomComponent
  }
}
</script>

<style lang="scss" scoped>
.d2-crud {
  .d2-crud-header {
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
  }

  .d2-crud-body {
    padding: 15px 0;
    overflow: hidden;
  }
  .d2-crud-pagination {
    padding: 15px 0;
  }
}
</style>
<style lang="scss">
.hover {
  font-size: 14px;
  color: #333;
  /* line-height: 16px; */
  > div {
    padding: 10px;
    cursor: pointer;

    &:hover {
      color: #b45f1a;
      background: #fff4e9;
    }
  }
}
.rowHandle > .cell {
  display: flex;
  .btn {
    margin-left: 10px !important;
  }
}
.look_n_content {
  text-align: center;
  font-size: 16px;
  line-height: 35px;
}
</style>
