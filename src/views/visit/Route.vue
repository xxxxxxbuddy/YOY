<template>
    <div>
        <Header title="线路推荐" color="rgba(88, 176, 81, 1)"></Header>

        <div class="route-types">
            <div class="type" v-for="item in types" :key="item.typeID" :style="'background-image: url(' + item.typeImg + ')'">
                <span class="name">{{item.typeName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'

export default {
  components: {
    Header
  },
  data() {
    return {
      types: [
        {
          typeID: 0,
          typeName: '亲子之旅',
          typeImg: require('@/assets/images/family.jpg')
        },
        {
          typeID: 1,
          typeName: '惊险之旅',
          typeImg: require('@/assets/images/adventure.jpg')
        },
        {
          typeID: 2,
          typeName: '温馨之旅',
          typeImg: require('@/assets/images/sweet.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
  .type{
    width: 98vw;
    height: 50vw;
    margin: 2vh 1vw;
    border-radius: 2vw;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .name{
    color: #fff;
    font-size: 2.5rem;
    text-align: center;
    display: block;
    line-height: 50vw;
  }
</style>
