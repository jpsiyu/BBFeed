var app = getApp()
var util = require('../../utils/util.js')

var msgCfg = ['喂奶', '睡觉', '臭臭']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[]
  },

  /**
   * 存储
   */
  storage:{},

  /**
   * 增加记录
   */
  add2record: function(rType){
    var d = new Date()
    var ts = util.formatTime2(d)

    var storageStr = app.storage.getStr(rType, d)
    this.add2storage(storageStr)

    var display = {msg: msgCfg[rType], time: ts}
    this.data.records.unshift(display)
    this.updateRecord()
  },

  /**
   * 存储->显示
   */
  storage2display(record){
    var msg = msgCfg[record.rType]
    var ts = util.formatTime2(new Date(record.time))
    return {msg:msg, time: ts}
  },

  /**
   * 存储
   */
  add2storage: function(record){
    app.storage.add(record)
  },

  /**
   * 喂奶
   */
  feed: function(){
    this.add2record(0)
  },

  /**
   * 睡觉
   */
  sleep: function() {
    this.add2record(1)
  },

  /**
   * 拉屎
   */
  shit: function(){
    this.add2record(2)
  },

  /**
   * jump
   */
  jump: function(){
    wx.navigateTo({
      url: '../analyse/analyse',
    })
  },

  /**
   * 刷新记录列表
   */
  updateRecord: function(){
    this.setData({ records: this.data.records })
  },

  /**
   * 初始化记录
   */
  initRecord: function(){
    var r = app.storage.get()
    for(var i = 0; i < r.length; i++){
      this.data.records.unshift(this.storage2display(r[i]))
    }
    this.updateRecord()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRecord()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})