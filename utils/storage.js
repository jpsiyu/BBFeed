const key = 'record'
var today = new Date().toLocaleDateString()
var version = '1.1'

var Storage = function(){
  this.recordDict = null;
}

Storage.prototype.init = function(){
  var res = wx.getStorageSync(key)

  var newDict = function(){
    var d = {}
    d.version = version
    return d
  }

  if (res == "")
    this.recordDict = newDict()
  else if(res.version != version)
    this.recordDict = newDict()
  else
    this.recordDict = res

  if(this.recordDict[today] == null)
    this.recordDict[today] = []

  //console.log('init storage', this.recordDict)
}


Storage.prototype.add = function (aRecord){
  this.recordDict[today].push(aRecord)
  wx.setStorage({
    key: key,
    data: this.recordDict,
    success: function () { console.log("add storage success") },
    fail: function () { console.log("add storage fail") },
  })
}

Storage.prototype.get = function(){
  return this.recordDict[today]
}

Storage.prototype.getStr = function(rType, time){
  var storageStr = { rType: rType, time: time }
  return storageStr
}

module.exports = Storage