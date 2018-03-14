<template>
  <div class="main">
    <div class="header">
      <div>  </div>
      <div class="header-text"> 哪儿 </div>
      <div class="header-button"> <mt-button type="primary" size="small" plain>发布</mt-button> </div>
    </div>
    <div class="paper">
      <div class="text">
        今天是个好日子...
      </div>
      <div class="media">
        <ul class="grid-container" v-for="">
          <li class="grid-item">1</li>
          <li class="grid-item">2</li>
          <li class="grid-item">3</li>
          <li class="grid-item">4</li>
          <li class="grid-item">5</li>
          <li class="grid-item">6</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "leave-brand"   //留下印记

    }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 50px;
    background: #eaeaea;
  }

  .paper {
    max-width: 414px;
    margin-left: 11px;
  }

  .text {
    font-size: 14px;
    text-align: left;
  }

  .media {
    margin: 0;
    padding: 0;
  }

  .grid-container {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .grid-item {
    float: left;
    margin-right: 3px;
    margin-bottom: 3px;
    width: 110px;
    height: 110px;
    background: no-repeat 50% tomato;
    background-size: cover;

    line-height: 110px;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
  }
</style>
