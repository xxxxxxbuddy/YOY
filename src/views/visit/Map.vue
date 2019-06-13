<template>
    <div>
      <Header title="位置"></Header>
      <div class="map"></div>
    </div>
</template>

<script>
import Header from '@/components/header'
import {MessageBox} from 'element-ui'
var INTERVAL = '';

/*  定义地图上对象类    */
class Target {
  // 东南角坐标
  baseX = 1771;
  baseY = 1998;
  // 图像东南角坐标
  mapX = 752;
  mapY = 255;
  // 比例尺
  scaleX = 2.7;
  scaleY = 6.23;
  /**
   * @description 通过坐标初始化对象
   * @param x {Number} 横坐标
   * @param y {Number} 纵坐标
   * @param Name {String} 对象的名字
   * @param VisitorID {String} 对象的VisitorID
   */
  constructor(x, y, Name, VisitorID) {
    this.x = 500 + (this.baseX - x) / this.scaleX;
    this.y = 575 - (this.baseY - y) / this.scaleY;
    this.Name = Name;
    this.VisitorID = VisitorID;
  }
  /**
   * @description 位置移动
   * @param x {Number} 新位置横坐标
   * @param y {Number} 新位置纵坐标
   */
  moveTo(x, y) {
    if(!this.element) {
      this.drawTarget(x, y);
    }else {
      x = 500 + (this.baseX - x) / this.scaleX;
      y = 575 - (this.baseY - y) / this.scaleY;
      let xMove = x - this.x;
      let yMove = y - this.y;
      console.log(`${xMove}  ${yMove}`)
      this.element.style.transform = 'translate(' + xMove + 'px,' + yMove + 'px)';
    }
  }

  /**
   *@description 将对象绘制在地图上
   *@param {container} HtmlElement 地图所在容器
   */
  drawTarget(container) {
    this.element = document.createElement('div');
    let img = document.createElement('img');
    let popover = document.createElement('div');
    popover.innerText = this.Name;
    popover.classList.add('popover');
    img.src = require('@/assets/images/address.svg');
    img.style.width = '2rem';
    this.element.appendChild(img);
    this.element.appendChild(popover);
    this.element.style.position = 'absolute';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.classList.add('target');
    container.appendChild(this.element);
  }
  
  /**
   * @description 将对象从地图上清除
   */
  clearTarget() {
    this.element.style.display = 'none';
  }
}

export default {
  components: {
    Header
  },
  data() {
    return {
      MyPos: [],
      GroupPos: []
    }
  },
  activated() {
    let container = document.getElementsByClassName('map')[0];
    if(this.$route.params.GroupID !== '') {
      this.getLocation(this.$route.params.GroupID, 'group');
      this.revealOnMap(this.GroupPos, container);
      INTERVAL = setInterval(() => {
        this.getLocation(this.$route.params.GroupID, 'group');
        this.revealOnMap(this.GroupPos, container);
      }, 2000);
    }else {
      this.getLocation(window.sessionStorage.getItem('VisitorID'), 'individual');
      this.revealOnMap(this.MyPos, container);
      INTERVAL = setInterval(() => {
        this.getLocation(window.sessionStorage.getItem('VisitorID'), 'individual');
        this.revealOnMap(this.MyPos, container);
      }, 2000);
    }

    setInterval(() => {
      
    }, 2000);
    // var baseX = 1094;
    // var baseY = 32;
    // let Target1 = new Target(baseX, baseY, "张雷", "V12314");
    // Target1.drawTarget(container);
    // setInterval(() => {
    //   baseX += 20;
    //   baseY += 20;
    //   Target1.moveTo(baseX, baseY);
    // }, 1000);

    // if(this.$route.params.GroupID !== 'undefined') {
      
    // }else if(this.$route.params.VisitorID !== 'undefined') {
    //   this.$axios.get('/Amusement.svc/Group/GetLocation/VisiotorID?' + this.$route.params.VisitorID)
    //     .then(res => {
    //       if(res.data.code === 1) {
    //         this.MyPos = res.data.result;
    //       }else {
    //         MessageBox({
    //           type: 'error',
    //           message: '无法获取你的位置'
    //         })
    //       }
    //     })
    //     .catch(e => {
    //       MessageBox({
    //         type: 'error',
    //         message: '获取位置失败,' + e.message
    //       })
    //     })
    // }
  },
  methods: {
    getLocation(ID, type) {
      if(type === 'group') {
        this.$axios.get('/Amusement.svc/Group/GroupLocation/' + ID)
          .then(res => {
            if(res.data.code === 1) {
              this.GroupPos = res.data.result;
            }else {
              if(this.GroupPos.length === 0) {
                MessageBox({
                  type: 'error',
                  message: `无法获取位置\n${res.data.errMsg}`
                });
                clearInterval(INTERVAL);
              }
            }
          })
          .catch(e => {
            MessageBox({
              type: 'error',
              message: '获取位置失败,' + e.message
            });
            clearInterval(INTERVAL);
          })
      }else {
        this.$axios.get('/Amusement.svc/Group/GetLocation/' + ID)
          .then(res => {
            if(res.data.code === 1) {
              this.MyPos = res.data.result;
              this.MyPos[0].name = '我';
            }else {
              if(!this.MyPos.length === 0) {
                MessageBox({
                  type: 'error',
                  message: `无法获取位置\n${res.data.errMsg}`
                });
                clearInterval(INTERVAL);
              }
            }
          })
          .catch(e => {
            MessageBox({
              type: 'error',
              message: '获取位置失败,' + e.message
            });
            clearInterval(INTERVAL);
          })
      }
    },
    revealOnMap(list, container) {
      if(list.length === 1) { // 只有本人位置
        if(!window.TargetMe) {
          window.TargetMe = new Target(list[0].X, list[0].Y, list[0].Name, list[0].VisitorID);
          window.TargetMe.drawTarget(container);
        }else {
          window.TargetMe.moveTo(list[0].X, list[0].Y);
        }
      } else { // 全部组员位置
        for(let i = 0; i < list.length; i++) {
          if(window['Target' + i]) {
            window['Target' + i].moveTo(list[i].X, list[i].Y);
          } else {
            window['Target' + i] = new Target(list[i].X, list[i].Y, list[i].Name, list[i].VisitorID);
            window['Target' + i].drawTarget(container);
          }
        }
      }
    }
  }
}
</script>

<style>
.map{
    background-image: url('../../assets/images/Map.png');
    height: 100vh;
    margin-top: -3rem;
    width: 164vh;
    z-index: -1;
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
}
.target{
  transition: all 1s linear;
}
.popover{
  position: absolute;
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0.2rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  top: -2rem;
  left: 50%;
  width: 150%;
  text-align: center;
  border-radius: 0.4rem;
  transform: translateX(-50%);
}
</style>
