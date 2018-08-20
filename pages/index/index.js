//index.js
//获取应用实例
const app = getApp()
var mytimer =null;

Page({
  data: {
    motto: '欢迎来到【快乐一摇】的世界',
    avatarUrl: 'd.png',
    opacity:0,
    threshold:50,

    winH:50,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var that=this;
    wx.onCompassChange(function (res) {
      //debugger
      if(res.direction>100){
        console.log("=======" + res.direction + ",mytimer=" + mytimer);
        if (mytimer==null){
          that.yaoyiyao();
        }
       
      }
     

    })
    wx.startCompass();

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  yaoyiyao:function(){
    if (this.data.motto != "你开发，我快乐") {
      this.setData({
        motto: "你开发，我快乐"
      })
    } else {
      this.setData({
        motto: "欢迎来到【快乐一摇】的世界"
      })
    }

    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res) => {
    //     var latitude = res.latitude // 经度
    //     var longitude = res.longitude // 纬度
    //     console.log("latitude=" + latitude + ",longitude=" + longitude)
    //   }
    // })
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })

    // this.data.opacity
    var idx = 0;
    var that = this;
    mytimer = setInterval(function () {
      idx++;
      var tmp = that.randomNum(1, 6);
      var opacity = that.data.opacity + 0.1;
      if (opacity > 0.5) {
        opacity = 0;
      }
      console.log("idx=" + idx + ",opacity=" + opacity);

      // debugger
      that.setData({
        avatarUrl: tmp + ".png",
        opacity: opacity
      });
      if (idx >= 10) {
        clearInterval(mytimer);
        mytimer=null;
        console.log("...mytimer="+mytimer) ;
      }
    }, 100);
  },

  clickMe: function() {
    this.yaoyiyao();
  },
  //生成从minNum到maxNum的随机数
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
    }
  }
 


});


