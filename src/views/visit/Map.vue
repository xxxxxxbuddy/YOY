<template>
    <div>
      <Header title="位置"></Header>
      <div class="map"></div>
    </div>
</template>

<script>
import Header from '@/components/header'
import {MessageBox} from 'element-ui'

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

    }
  },
  mounted() {
    let container = document.getElementsByClassName('map')[0];
    let Target1 = null;
    setInterval(() => {
      this.$axios.get('/Amusement.svc/Group/GetLocation/V201905140001')
        .then(res => {
          if(res.data.code === 1) {
            this.MyPos = res.data.result[0];
            if(!Target1) {
              Target1 = new Target(this.MyPos.X, this.MyPos.Y, '王翀', 'V201905140001');
              Target1.drawTarget(container);
            }else {
              Target1.moveTo(this.MyPos.X, this.MyPos.Y);
            }
          }else {
            MessageBox({
              type: 'error',
              message: '无法获取你的位置'
            })
          }
        })
        .catch(e => {
          MessageBox({
            type: 'error',
            message: '获取位置失败,' + e.message
          })
        })
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
