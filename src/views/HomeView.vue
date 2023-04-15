<template>
  <el-container style="min-height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="activeIndex">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-submenu v-for="(item, index) in navList" :key="item.title" :index="'1-'+index">
            <template slot="title">{{ item.title }}</template>
            <el-menu-item v-for="data in item.children" :key="data.path" :index="data.path" @click="handleNavBtnClick(data.path)">{{ data.title }}</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
        <el-button @click="handleBackupBtnClick" type="text" icon="el-icon-arrow-left" style="color: grey;margin-right: calc(100% - 80px)">
          <span>返回</span>
        </el-button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span></span>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
        navList: [
          {
            title: '订单管理',
            children: [
              {
                title: '查看订单',
                path: '/order'
              },
              {
                title: '查看历史订单',
                path: '/order/history'
              }
            ]
          },
          {
            title: '分类管理',
            children: [
              {
                title: '管理分类',
                path: '/category'
              },
              {
                title: '新建分类',
                path: '/category/create'
              }
            ]
          },
          {
            title: '菜单管理',
            children: [
              {
                title: '管理菜单',
                path: '/recipe'
              },
              {
                title: '新建菜单',
                path: '/recipe/create'
              }
            ]
          },
          
        ],
        activeIndex: '/category'
      }
    },
    methods: {
      handleNavBtnClick(path) {
        this.$router.push({
          path: path
        }, () => {
          this.activeIndex = path
        })
      },
      handleBackupBtnClick() {
        this.$router.go(-1)
      }
    },
    // 每次刷新页面时，重新设置activeIndex
    created() {
      // 取最后一个/前的字符串
      if (this.$route.path === '/') {
        this.activeIndex = '/order'
      } else {
        if (this.$route.params.id) {
          this.activeIndex = this.$route.path.replace(/\/\w+$/, '');
        } else {
          this.activeIndex = this.$route.path
        }
      }
      console.log(this.activeIndex);
    },
    watch: {
      // 监听路由变化，重新设置activeIndex
      '$route': function (to, from) {
        if (to.path === '/') {
        this.activeIndex = '/order'
      } else {
        if (this.$route.params.id) {
          this.activeIndex = to.path.replace(/\/\w+$/, '');
        } else {
          this.activeIndex = to.path
        }
      }
      }
    }
  };
</script>

.<style scoped>
  .el-button--text {
    color: grey !important;
  }

  .el-button--text:hover {
    color: #f8f8f8 !important;
  }

</style>