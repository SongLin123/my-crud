<!--
 * @Date: 2020-06-09 12:33:27
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-09 18:52:44
 * @FilePath: \d2-crud\README.md
-->
![](https://raw.githubusercontent.com/d2-projects/d2-crud/master/doc/image/banner.png)

![npm](https://img.shields.io/npm/v/@d2-projects/d2-crud.svg)
![npm](https://img.shields.io/npm/dt/@d2-projects/d2-crud.svg)
![GitHub license](https://img.shields.io/github/license/d2-projects/d2-crud.svg)


## 介绍

基于[D2-Crud](https://github.com/d2-projects/d2-crud)修改的vue组件，添加部分功能。


## 文档和示例

文档：<https://d2.pub/zh/doc/d2-crud-v2>
示例：<https://d2.pub/d2-admin/preview/#/demo/d2-crud/index>

## 功能

- 继承了 Element 中表格所有功能
- 新增表格数据
- 修改表格数据
- 删除表格数据
- 使用 Element 中的组件渲染表格内容和表单内容
- 表单校验
- 表格内编辑
- 渲染自定义组件

## 安装

使用npm
``` bash
npm i element-ui @d2-projects/d2-crud -S
```

使用yarn
``` bash
yarn add element-ui @d2-projects/d2-crud
```

## 在项目中使用

在`main.js`中写入以下内容：

``` js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import D2Crud from '@d2-projects/d2-crud'

Vue.use(ElementUI)
Vue.use(D2Crud)

new Vue({
  el: '#app',
  render: h => h(App)
})
```


## 新增

### rowHandle
  edit\remove\custom 新增sort字段(Number)，为按钮排序权重
