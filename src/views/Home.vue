<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <el-menu
          default-active="2"
          :unique-opened='true'
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          text-color="#fff"
          background-color="#051633"
          active-text-color="#1cddeb"
          :router='true'
          :collapse="isCollapse"
        >
          <span
            class="myicon toggle-btn el-icon-menu"
            @click='isCollapse = !isCollapse'
            style="width:180px"
          ></span>
          <el-menu-item index="/standingBook">
            <!-- <i class="standingBook"></i> -->
            <img
              src="../assets/image/mine.png"
              alt=""
            >
            <span slot="title">台账</span>
          </el-menu-item>
          <el-menu-item index="/powerBox">
            <!-- <i class="el-icon-setting"></i> -->
            <img
              src="../assets/image/oppen.png"
              alt=""
            >
            <span slot="title">开关柜</span>
          </el-menu-item>
          <el-menu-item index="/station">
            <!-- <i class="el-icon-menu"></i> -->
            <img
              src="../assets/image/sdInf.png"
              alt=""
            >
            <span slot="title">站点信息管理</span>
          </el-menu-item>
          <el-menu-item index="/userManagement">
            <!-- <i class="el-icon-setting"></i> -->
            <img
              src="../assets/image/user.png"
              alt=""
            >
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <!-- <i class="el-icon-news"></i> -->
              <img
                src="../assets/image/linkageM.png"
                alt=""
              >
              <span>联动管理</span>
            </template>
            <el-menu-item index="/linkageSet">
              <img
                src="../assets/image/linkageSet.png"
                alt=""
              >
              联动配置
            </el-menu-item>
            <el-menu-item index="/linkageLog">
              <img
                src="../assets/image/linkageLog.png"
                alt=""
              >
              联动日志
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <!-- <i class="el-icon-news"></i> -->
              <img
                src="../assets/image/devices.png"
                alt=""
              >
              <span>设备系列</span>
            </template>
            <el-menu-item index="/deviceManagement">
              <img
                src="../assets/image/deviceM.png"
                alt=""
              >
              设备管理
            </el-menu-item>
            <el-menu-item index="/deviceTypeManagement">
              <img
                src="../assets/image/deviceTypeM.png"
                alt=""
              >
              设备类型管理
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <img
                src="../assets/image/sights.png"
                alt=""
              >
              <span>测点系列</span>
            </template>
            <el-menu-item index="/sightManagement">
              <img
                src="../assets/image/sightM.png"
                alt=""
              >
              测点管理
            </el-menu-item>
            <el-menu-item index="/sightTypeManagement">
              <img
                src="../assets/image/sightType.png"
                alt=""
              >
              测点类型管理
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <img
                src="../assets/image/alarmM.png"
                alt=""
              >
              <span>告警管理</span>
            </template>
            <el-menu-item index="/alarmEventType">
              <img
                src="../assets/image/alarmEvent.png"
                alt=""
              >
              告警事件类型
            </el-menu-item>
            <el-menu-item index="/alarmGroup">
              <img
                src="../assets/image/alarmGroup.png"
                alt=""
              >
              告警组
            </el-menu-item>
            <el-menu-item index="/alarmLevel">
              <img
                src="../assets/image/alarmLevel.png"
                alt=""
              >
              告警等级
            </el-menu-item>
            <el-menu-item index="/alarmMember">
              <img
                src="../assets/image/alarmPeople.png"
                alt=""
              >
              告警成员
            </el-menu-item>
            <el-menu-item index="/alarmPolicyGroup">
              <img
                src="../assets/image/alarmPG.png"
                alt=""
              >
              告警策略组
            </el-menu-item>
            <el-menu-item index="alarmPolicyManagement">
              <img
                src="../assets/image/alarmPM.png"
                alt=""
              >
              告警策略管理
            </el-menu-item>
            <el-menu-item index="/alarmPolicyModel">
              <img
                src="../assets/image/alarmPModel.png"
                alt=""
              >
              告警策略模板
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div class="system-title">
            <span class="topText">智 能 电 房 后 台 管 理 系 统</span>
            <div class="system-right">
              <!-- <span class="welcome">你好：admin{{user.name}}</span> -->
              <span class="welcome">你好：admin</span>
              <el-button
                class="tuichu"
                type="text"
              >退出</el-button>
            </div>
          </div>
        </el-header>
        <el-main>
          <!-- 真正展示嵌套路由内容的区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      user: JSON.parse(window.localStorage.getItem("snt_user"))
    };
  },
  mounted() {
    // console.log(document.cookie);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background: url("../assets/image/597907491651955339.jpg");
  background-size: contain;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background: rgba($color: #051633, $alpha: 0.6);
    border-radius: 6px;
    ul {
      li {
        font-size: 14px;
      }
      li:hover {
        background-color: #051633;
      }
      .is-active {
        background-color: #051633;
      }
    }
  }
  .el-header {
    justify-content: space-between;
    align-items: center;
    .system-title {
      color: #b5defe;
      background: url("../assets/image/889711639375594149.png") no-repeat center;
      height: 50px;
      width: 100%;
      text-align: center;
      line-height: 40px;
      .topText {
        color: #fff;
        font-size: 26px;
        padding-left: 190px;
      }
      .system-right {
        position: relative;
        float: right;
        .welcome {
          font-size: 12px;
          color: #b5defe;
          padding-right: 23px;
          border-right: 2px solid #b5defe;
        }
        .tuichu {
          padding-left: 60px;
        }
        .tuichu::before {
          content: url("../assets/image/admin-peo.png");
          padding: 0 10px;
          position: absolute;
          top: 5px;
          left: 114px;
        }
      }
    }
  }
  .el-icon-printer::before {
    padding-right: 12px;
  }
  .el-icon-date::before {
    padding-right: 12px;
  }
  .el-icon-goods::before {
    padding-right: 12px;
  }
  .el-icon-sold-out::before {
    padding-right: 12px;
  }
}
.el-submenu span {
  font-size: 14px;
}
.toggle-btn {
  padding: 0 15px;
  font-size: 36px;
  color: white;
  cursor: pointer;
  line-height: 60px;
  &:hover {
    background-color: #4292cf;
  }
}
</style>
