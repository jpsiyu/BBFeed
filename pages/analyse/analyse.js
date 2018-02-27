// pages/analyse/analyse.js

var app = getApp()
var util = require('../../utils/util.js')

var msgCfg = ['喂奶', '睡觉', '臭臭']


var viewCfg = {
  labelH: 13,
  lineH: 2400,
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 计算高度
   */
  calLabelPos: function(percent){
    return viewCfg.lineH * percent - viewCfg.labelH
  },

  /**
   * 设置时间点
   */
  setClock: function(){
    var clockList = []
    var clockPos = 0
    var clockStr = ''
    for(var i = 0; i <=24; i++){
      clockPos = this.calLabelPos(i/24)
      clockStr = [i, 0].map(util.formatNumber).join(':')
      clockList.push({ clock: clockStr, clockPos: clockPos})
    }
    this.setData({
      clockList: clockList
    })
  },

  /**
   * 更新记录线
   */
  updateLine: function(){

    var labelList = []
    var records = app.storage.get()
    var l = records.length
    for (var i = 0; i < records.length; i++) {
      var date = new Date(records[i].time)
      var t = util.formatTime3(new Date(records[i].time))
      var s = t + " " + msgCfg[records[i].rType]

      var dateZero = new Date(records[i].time).setHours(0, 0, 0, 0)
      var percent = (date - dateZero) / (24 * 3600 * 1000)

      labelList.push({ msg: s, labelPos: this.calLabelPos(percent) })
    }
    this.setData({
      lineH: viewCfg.lineH,
      labelList: labelList
    })
  },

  /**
   * 更新统计
   */
  updateAnalyse: function(){
    this.setData({
      feedCount: app.storage.getCount(0),
      shitCount: app.storage.getCount(2),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setClock()
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updateLine()
    this.updateAnalyse()
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