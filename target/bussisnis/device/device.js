/** 设备管理*/
const pre = '/device'
export default ({ request, requestForMock, mock, tools, moduleName }) => ({


  
      /**
  * @description 新增设备  post /device/addDevice
  
  */
  BUSSISNIS_DEVICE_ADDDEVICE_POST({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/addDevice`,
      method: 'post',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 修改设备状态  put /device/changeDeviceStatus
  
  */
  BUSSISNIS_DEVICE_CHANGEDEVICESTATUS_PUT({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/changeDeviceStatus`,
      method: 'put',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 删除设备  delete /device/deleteDevice/{deviceId}
  
  */
  BUSSISNIS_DEVICE_DELETEDEVICE_DELETE({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/deleteDevice/${path}`,
      method: 'delete',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 批量删除设备  post /device/deleteDeviceBatch
  
  */
  BUSSISNIS_DEVICE_DELETEDEVICEBATCH_POST({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/deleteDeviceBatch`,
      method: 'post',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 获取考勤设备列表  get /device/getCheckInDevice
  
  */
  BUSSISNIS_DEVICE_GETCHECKINDEVICE_GET({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getCheckInDevice`,
      method: 'get',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 获取设备详情  get /device/getDeviceDetail/{deviceId}
  
  */
  BUSSISNIS_DEVICE_GETDEVICEDETAIL_GET({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getDeviceDetail/${path}`,
      method: 'get',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 查询设备列表  post /device/getDeviceList
  
  */
  BUSSISNIS_DEVICE_GETDEVICELIST_POST({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getDeviceList`,
      method: 'post',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 获取nebula列表  post /device/getNebulaList
  
  */
  BUSSISNIS_DEVICE_GETNEBULALIST_POST({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/getNebulaList`,
      method: 'post',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 移动设备  put /device/moveDevice
  
  */
  BUSSISNIS_DEVICE_MOVEDEVICE_PUT({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/moveDevice`,
      method: 'put',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
      /**
  * @description 编辑设备  put /device/updateDevice
  
  */
  BUSSISNIS_DEVICE_UPDATEDEVICE_PUT({body=undefined,param=undefined,header=undefined,path=undefined}) {
    // 接口请求
    return request({
      url: `${moduleName + pre}/updateDevice`,
      method: 'put',
      headers:{'Content-Type':'application/json',
       ...header
      },
      data:body,
      params:param,
    })
  },
  
 
})
