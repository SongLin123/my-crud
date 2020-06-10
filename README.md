![](https://raw.githubusercontent.com/d2-projects/d2-crud/master/doc/image/banner.png)

![npm](https://img.shields.io/npm/v/@d2-projects/d2-crud.svg)
![npm](https://img.shields.io/npm/dt/@d2-projects/d2-crud.svg)
![GitHub license](https://img.shields.io/github/license/d2-projects/d2-crud.svg)


## 介绍

[D2-Crud](https://github.com/d2-projects/d2-crud)是一套基于[Vue.js 2.2.0+](https://cn.vuejs.org/)和[Element UI 2.0.0+](http://element-cn.eleme.io/#/zh-CN)的表格组件。`D2-Crud` 将 `Element` 的功能进行了封装，并增加了表格的增删改查、数据校验、表格内编辑等常用的功能。大部分功能可由配置 `json` 实现，在实现并扩展了 `Element` 表格组件功能的同时，降低了开发难度，减少了代码量，大大简化了开发流程。


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

之后就可以在项目中使用 `D2-Crud` 了。

## CDN

externals: D2Crud

https://cdn.d2.pub/packages/@d2-projects/d2-crud@2.0.5/d2-crud.js


## 补丁修改
- 解决自带选择框 form-data-change 事件无法正确传递到父组件的问题
- 增加自定义查看按钮

- 使用：
``` js
<d2-crud v-bind:look-template="addTemplate"></d2-crud>
rowHandle: {
  look: {
    text: "查看",
    emit: "lookHandle"
  },
}
```

- 增加查看功能，查看时元素默认disabled
- 自定义组件disabled 需要在props中增加  disabled: Boolean   组件属性写： :disabled="disabled"



- 增加纯文字查看
- 使用：
``` js
rowHandle: {
  lookNoEle: {
    text: "查看",
    emit: "lookHandle"
  },
}
```


- 自定义查看formatter
- 使用：
``` js
 mycom: {
    title: "选择框",
    value: "",
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
```

- 自定义查看可自定义class
- 使用：
``` js
 roleName: {
    title: "角色名",
    value: "",
    class: "my_label",
    component: {
      placeholder: " 仅可输入英文大小写、数字"
    }
  },
```


