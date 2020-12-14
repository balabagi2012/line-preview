<template>
  <el-container>
    <el-header class="header">
      <h1>Line Preview</h1>
    </el-header>
    <el-container>
      <el-row type="flex">
        <el-col :span="8" class="demo-container">
          <div class="demo-message-container">
            <div class="demo-message-header">
              <div
                class="demo-message-img style1"
                :style="`background-image:url(${imgUrl})`"
              ></div>
            </div>
            <div class="demo-message-body"></div>
          </div>
        </el-col>
        <el-col :span="8" class="node-container"> </el-col>
        <el-col :span="8" class="form-container">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="背景圖片"> </el-form-item>
            <el-form-item label="Ratio"> </el-form-item>
            <el-form-item label="顯示圖片"> </el-form-item>
            <el-form-item label="可選區域"> </el-form-item>
            <el-form-item label="按鈕文字">
              <el-input type="text" v-model="text"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog title="剪裁圖片" :visible.sync="showClipper">
        <clipper-basic
          ref="clipper"
          :src="imgUrl"
          :ratio="ratio"
          class="form-clip-container"
        />
        <span slot="footer" class="dialog-footer">
          <el-button>取消</el-button>
          <el-button type="primary">剪裁</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "App",
  components: {},
  data() {
    return {
      showClipper: false,
      imgUrl:
        "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #f4f6f9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  h1 {
    flex: 1 1 auto;
    font-size: 26px;
    font-weight: 700;
    color: #777;
    margin: auto auto auto 20px;
    line-height: 1.2;
  }
}

.el-row {
  width: 100%;
}

.demo-container {
  background-color: #849ebf;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
  .demo-message-container {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 17px;
    .demo-message-header {
      width: 100%;
      .demo-message-img {
        width: 100%;
        border-top-left-radius: 17px;
        border-top-right-radius: 17px;
        &.style1 {
          height: 300px;
          border-bottom-left-radius: 17px;
          border-bottom-right-radius: 17px;
        }
        &.style2 {
          height: 195px;
        }
      }
    }
    .demo-message-body {
      display: flex;
      background-color: #fff;
      width: 100%;
      &.style2 {
        border-bottom-left-radius: 17px;
        border-bottom-right-radius: 17px;
      }
    }
  }
}

.node-container {
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #333;
  padding: 16px;
}

.form-container {
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #eee;
  padding: 16px;
  .form-cliper-container {
    width: 500px;
    height: auto;
  }
}
</style>