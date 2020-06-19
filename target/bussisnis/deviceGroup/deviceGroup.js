/** 设备组管理*/
const pre = '/deviceGroup'
export default ({ request, requestForMock, mock, tools, moduleName }) => ({


  
      /**
  * @description 添加设备组  post /deviceGroup/addGroup
  
  */
  BUSSISNIS_DEVICEGROUP_ADDGROUP_POST({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/addGroup`,
      method: 'post',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 删除设备组  delete /deviceGroup/deleteDeviceGroup/{groupId}
  
  */
  BUSSISNIS_DEVICEGROUP_DELETEDEVICEGROUP_DELETE({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/deleteDeviceGroup/${path}`,
      method: 'delete',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 查询设备组详情  get /deviceGroup/getDeviceGroupDetail/{groupId}
  
  */
  BUSSISNIS_DEVICEGROUP_GETDEVICEGROUPDETAIL_GET({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getDeviceGroupDetail/${path}`,
      method: 'get',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 查询设备组列表(一次加载全部)  get /deviceGroup/getGroup
  
  */
  BUSSISNIS_DEVICEGROUP_GETGROUPTREE_GET({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getGroupTree`,
      method: 'get',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 查询设备组列表(仅加载一层)  get /deviceGroup/getNextNodeGroup/{parentId}
  
  */
  BUSSISNIS_DEVICEGROUP_GETNEXTNODEGROUP_GET({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getNextNodeGroup/${path}`,
      method: 'get',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 修改设备组  put /deviceGroup/updateGroup
  
  */
  BUSSISNIS_DEVICEGROUP_UPDATEGROUP_PUT({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/updateGroup`,
      method: 'put',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
 
})
