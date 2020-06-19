/** 人员组管理*/
const pre = '/personGroup'
export default ({ request, requestForMock, mock, tools, moduleName }) => ({


  
      /**
  * @description 添加人员组  post /personGroup/addPersonGroup
  
  */
  BUSSISNIS_PERSONGROUP_ADDPERSONGROUP_POST({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/addPersonGroup`,
      method: 'post',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 删除人员组  delete /personGroup/deletePersonGroup/{groupId}
  
  */
  BUSSISNIS_PERSONGROUP_DELETEPERSONGROUP_DELETE({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/deletePersonGroup/${path}`,
      method: 'delete',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 查询人员组(加载一层)  get /personGroup/getChildPersonGroup/{parentId}
  
  */
  BUSSISNIS_PERSONGROUP_GETCHILDPERSONGROUP_GET({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getChildPersonGroup/${path}`,
      method: 'get',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 查询人员组(加载全部子节点)  get /personGroup/getPersonGroup
  
  */
  BUSSISNIS_PERSONGROUP_GETPERSONGROUP_1_GET({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getPersonGroup_1`,
      method: 'get',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 修改人员组  put /personGroup/updatePersonGroup
  
  */
  BUSSISNIS_PERSONGROUP_UPDATEPERSONGROUP_PUT({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/updatePersonGroup`,
      method: 'put',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
 
})
