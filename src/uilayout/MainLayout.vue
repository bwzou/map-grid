<template>
  <div class="container">
    <router-view></router-view>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="where">
        <img slot="icon" src="../assets/images/icon_where.png">哪儿
      </mt-tab-item>
      <mt-tab-item id="journey">
        <img slot="icon" src="../assets/images/icon_journey.png">拼途
      </mt-tab-item>
      <mt-tab-item id="account">
        <img slot="icon" src="../assets/images/icon_account.png">我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
    export default {
      name: "main-layout",
      data(){
        return {
          selected:'where'
        }
      },
      watch: {
        selected: function (val, oldVal) {
          // 这里就可以通过 val 的值变更来确定
          console.log(val);
          if(val === oldVal){
            return;
          }
          switch (val){
            case 'where':
              this.$router.push({path: '/mainlayout/where' });
              break;
            case 'journey':
              this.$router.push({path: '/mainlayout/journey' });
              break;
            case 'account':
              this.$router.push({path: '/mainlayout/account' });
          }
        }
      },
      mounted:{

      },
      components:{},
    }
</script>

<style scoped>

</style>
