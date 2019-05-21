<template>
    <div>
        <Header title="线路推荐"></Header>

        <div>
            <el-timeline style="margin: 2vh 0">
                <el-timeline-item timestamp="中世纪城堡" icon="el-icon-location" size="large" placement="top">
                    <el-card class="card">
                        <img class="image" src="@/assets/images/buyTicketBG.jpg">
                        <div style="margin-left: 35vw">
                            <span class="name">中世纪城堡</span><br>
                            <span>开放时间：9:00-18:30</span><br>
                            <span>适合人群：青少年、成人</span><br>
                            <i class="el-icon-star-on"></i>
                            <span>恐高、有心脏病等不适合加入</span><br>
                            <i class="el-icon-location"></i>
                            <span>地址</span>
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="海螺湾" icon="el-icon-location" size="large" placement="top">
                    <el-card class="card">
                        <img class="image" src="@/assets/images/buyTicketBG.jpg">
                        <div style="margin-left: 35vw">
                            <span class="name">海螺湾</span><br>
                            <span>开放时间：9:00-18:30</span><br>
                            <span>适合人群：青少年、成人</span><br>
                            <i class="el-icon-star-on"></i>
                            <span>恐高、有心脏病等不适合加入</span><br>
                            <i class="el-icon-location"></i>
                            <span>地址</span>
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="生命之光" icon="el-icon-location" size="large" placement="top">
                    <el-card class="card">
                        <img class="image" src="@/assets/images/buyTicketBG.jpg">
                        <div style="margin-left: 35vw">
                            <span class="name">生命之光</span><br>
                            <span>开放时间：9:00-18:30</span><br>
                            <span>适合人群：青少年、成人</span><br>
                            <i class="el-icon-star-on"></i>
                            <span>恐高、有心脏病等不适合加入</span><br>
                            <i class="el-icon-location"></i>
                            <span>地址</span>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header';

export default {
  components: {
    Header
  },
  data() {
    return {

    }
  }
}
</script>

<style>
.el-timeline-item {
    position: relative;
    padding-bottom: 20px;
    margin-left: 1vw;
}
.image{
    width: 35vw;
    height: 100%;
    float: left;
    margin-right: 2vw;
}
.image::after{
    content: '';
    display: block;
    clear: both;
}
.card{
    line-height: 1.5;
    width: 90vw;
}
.card i{
    font-size: 1.25rem;
}
.card span{
    font-size: 1rem;
}
.name{
    font-size: 1.5rem !important;
}
.el-timeline-item__icon {
    color: rgb(64, 158, 255);
    font-size: 2rem;
}
.el-timeline-item__timestamp {
    color: #000;
    line-height: 1;
    font-size: 1.5rem;
}
</style>
