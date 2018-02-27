const key = 'record'
var version = '1.2'

/**
 * rType, 0:喂奶 1:睡觉 2:臭臭
 */

var Storage = function(){
  this.recordDict = null;
}

Storage.prototype.init = function(){
  var res = wx.getStorageSync(key)
  var day = new Date().toLocaleDateString()

  var newDict = function(){
    var d = {}
    d.version = version
    d.record = []
    d.day = day
    return d
  }

  if (res == "")
    this.recordDict = newDict()
  else if(res.version != version)
    this.recordDict = newDict()
  else if(res.day != day)
    this.recordDict = newDict()
  else
    this.recordDict = res

  //console.log('init storage', this.recordDict)
}


Storage.prototype.add = function (aRecord){
  this.recordDict.record.push(aRecord)
  wx.setStorage({
    key: key,
    data: this.recordDict,
    success: function () { console.log("add storage success") },
    fail: function () { console.log("add storage fail") },
  })
}

Storage.prototype.get = function(){
  return this.recordDict.record
}

Storage.prototype.getCount = function(rType) {
  var c = 0
  var record = this.recordDict.record
  var r = null
  for(var i = 0; i < record.length; i++){
    r = record[i]
    if(r.rType == rType)
      c++
  }
  return c
}

Storage.prototype.getStr = function(rType, time){
  var storageStr = { rType: rType, time: time }
  return storageStr
}

module.exports = Storage