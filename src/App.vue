<template>
  <el-container>
    <el-header class="header">
      <h1>岩脊解码器</h1>
      <span>原神 · 稻妻 · 方块机关解码器</span>  
    </el-header>
    <el-main>
      <Solver/>
    </el-main>
  </el-container>
</template>

<script setup>
   import Solver from "./components/Solver.vue"
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  display: flex;
  align-items: baseline;
  border-bottom: 1px solid #dcdfe6;
}
.header>span {
  margin-left: 1em;
  color : #909399
}
</style>