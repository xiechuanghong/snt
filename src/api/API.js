'use strict'
const root = ''
	
const security = 'security'
const alarm='alarm'
const linkage='linkage'
const info="info"

function Request(url, method) {
  return {
    url: url,
    method: method
  }
}

function Rest(model) {
  this.model = model
  this.baseUrl = root + '/' + this.model
  this.get = function(id) {
    return new Request(this.baseUrl + '/' + id, 'post')
  }
  this.add = new Request(this.baseUrl + '/add', 'post')
  this.update = new Request(this.baseUrl + '/update', 'post')
  this.delete = function(id) {
    return new Request(this.baseUrl + '/delete/' + id, 'post')
  }
  this.list = new Request(this.baseUrl + '/list', 'post')
  this.all = new Request(this.baseUrl + '/all', 'post')
}

module.exports = {
  security:{
    user: new Rest(security + '/user'),
    login: new Request(root + '/' + security + '/login','post')
  },
  alarmPolicyManagement:{
    alarms:new Rest(alarm+'/alarm'),
    queryManagement: new Request(root + "/" +alarm + "/policy/management/queryManagement","post"),
    saveManagement : new Request(root + "/" +alarm + "/policy/management/saveManagement","post"),
    updateManagement:  new Request(root + "/" +alarm + "/policy/management/updateManagement","post"),
    getManagement : new Request(root + "/" +alarm + "/policy/management/getManagement","post"),
    deleteManagement: new Request(root + "/" +alarm + "/policy/management/deleteManagement","post")
  },
  alarmPolicyGroup:{
    alarms:new Rest(alarm+'/alarm'),
    queryGroup: new Request(root + "/" +alarm + "/set/queryManagement","post"),
    saveGroup : new Request(root + "/" +alarm + "/set/saveManagement","post"),
    updateGroup:  new Request(root + "/" +alarm + "/set/updateManagement","post"),
    getGroup : new Request(root + "/" +alarm + "/set/getManagement","post"),
    deleteGroup: new Request(root + "/" +alarm + "/set/deleteManagement","post")
  },
  likageup:{
    linkage:new Rest(linkage+'/linkage'),
    queryLinkageSet: new Request(root + "/" +linkage + "/set/queryLinkageSet","post"),
    saveLinkageSet : new Request(root + "/" +linkage + "/set/saveLinkageSet","post"),
    updateLinkageSet:  new Request(root + "/" +linkage + "/set/updateLinkageSet","post"),
    getLinkageSet : new Request(root + "/" +linkage + "/set/getLinkageSet","post"),
    deleteLinkageSet: new Request(root + "/" +linkage + "/set/deleteLinkageSet","post"),
    queryManagement:new Request(root + "/" +linkage + "/log/queryManagement","post"),
  },
  infoup:{
    info:new Rest(info+'/info'),
    //设备
    queryDevice: new Request(root + "/" +info + "/device/queryDevice","post"),
    saveDevice : new Request(root + "/" +info + "/device/saveDevice","post"),
    updateDevice:  new Request(root + "/" +info + "/device/updateDevice","post"),
    getDevice : new Request(root + "/" +info + "/device/getDevice","post"),
    deleteDevice: new Request(root + "/" +info + "/device/deleteDevice","post"),
    //设备类型
    queryDeviceType: new Request(root + "/" +info + "/device/type/queryDeviceType","post"),
    saveDeviceType : new Request(root + "/" +info + "/device/type/saveDeviceType","post"),
    updateDeviceType:  new Request(root + "/" +info + "/device/type/updateDeviceType","post"),
    getDeviceType : new Request(root + "/" +info + "/device/type/getDeviceType","post"),
    deleteDeviceType: new Request(root + "/" +info + "/device/type/deleteDeviceType","post"),
    //测点
    queryChannel: new Request(root + "/" +info + "/channel/queryChannel","post"),
    saveChannel : new Request(root + "/" +info + "/channel/saveChannel","post"),
    updateChannel:  new Request(root + "/" +info + "/channel/updateChannel","post"),
    getChannel : new Request(root + "/" +info + "/channel/getChannel","post"),
    deleteChannel: new Request(root + "/" +info + "/channel/deleteChannel","post"),
    //测点类型
    queryChanneltype: new Request(root + "/" +info + "/channel/type/queryChanneltype","post"),
    saveChanneltype : new Request(root + "/" +info + "/channel/type/saveChanneltype","post"),
    updateChanneltype:  new Request(root + "/" +info + "/channel/type/updateChanneltype","post"),
    getChanneltype : new Request(root + "/" +info + "/channel/type/getChanneltype","post"),
    deleteChanneltype: new Request(root + "/" +info + "/channel/type/deleteChanneltype","post"),
    //台账
    queryStandingBook:new Request(root + "/" +info + "/standingBook/queryStandingBook","post"),
    //站点 
    queryStation: new Request(root + "/" +info + "/station/queryStation","post"),
    queryPowerBox: new Request(root + "/" +info + "/powerBox/queryPowerBox","post"),
    

  }
}
