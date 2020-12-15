<template>
  <el-container>
    <el-header class="header">
      <h1>Line Preview</h1>
    </el-header>
    <el-container>
      <el-row type="flex">
        <el-col :span="8" class="demo-container">
          <div class="demo-message-container">
            <!-- Header Start -->
            <div class="demo-message-header" :class="'style' + style">
              <template v-for="headerItem in menu.header.payload">
                <div
                  class="demo-message-badge"
                  v-if="headerItem.type === 'Badge'"
                  :key="headerItem.payload"
                >
                  {{ headerItem.payload }}
                </div>
                <div
                  class="demo-message-img"
                  :class="'style' + style"
                  v-else-if="headerItem.type === 'Image'"
                  :key="headerItem.payload"
                  :style="`background-image:url(${headerItem.payload})`"
                ></div>
                <div
                  class="demo-message-button"
                  :class="'style' + style"
                  v-else-if="headerItem.type === 'Button'"
                  :key="headerItem.payload"
                >
                  {{ headerItem.payload }}
                </div>
                <div
                  class="demo-description-box"
                  v-else-if="headerItem.type === 'Description'"
                  :key="headerItem.payload.key"
                >
                  <div class="demo-description-key">
                    {{ headerItem.payload.key }}
                  </div>
                  <div class="demo-description-value">
                    {{ headerItem.payload.value }}
                  </div>
                </div>
              </template>
            </div>
            <!-- Header End -->
            <!-- Body Start -->
            <div class="demo-message-body" :class="'style' + style">
              <template v-for="bodyItem in menu.body.payload">
                <div
                  class="demo-message-badge"
                  v-if="bodyItem.type === 'Badge'"
                  :key="bodyItem.payload"
                >
                  {{ bodyItem.payload }}
                </div>
                <div
                  class="demo-text-label"
                  v-else-if="bodyItem.type === 'Label'"
                  :key="bodyItem.payload"
                >
                  {{ bodyItem.payload }}
                </div>
                <div
                  class="demo-description-box"
                  v-else-if="bodyItem.type === 'Description'"
                  :key="bodyItem.payload.key"
                >
                  <div class="demo-description-key">
                    {{ bodyItem.payload.key }}
                  </div>
                  <div
                    class="demo-description-value"
                    v-if="bodyItem.payload.value"
                  >
                    {{ bodyItem.payload.value }}
                  </div>
                </div>
                <div
                  class="demo-buttons-box"
                  :class="bodyItem.style"
                  v-else-if="bodyItem.type === 'Buttons'"
                  :key="bodyItem.type"
                >
                  <div
                    class="demo-buttons-button"
                    v-for="button in bodyItem.payload"
                    :key="button.payload"
                  >
                    {{ button.payload }}
                  </div>
                </div>
                <div
                  class="demo-message-img"
                  v-else-if="bodyItem.type === 'Image'"
                  :key="bodyItem.payload"
                  :style="`background-image:url(${bodyItem.payload})`"
                ></div>
                <div
                  class="demo-message-separator"
                  v-else-if="bodyItem.type === 'Separator'"
                  :key="bodyItem.payload"
                ></div>
                <div
                  class="demo-text-p"
                  v-else-if="bodyItem.type === 'P'"
                  :key="bodyItem.payload"
                >
                  {{ bodyItem.payload }}
                </div>
              </template>
              <!-- Footer Start -->
              <div class="demo-message-footer">
                <template v-for="footerItem in menu.footer.payload">
                  <div
                    class="demo-text-note"
                    v-if="footerItem.type === 'Note'"
                    :key="footerItem.payload"
                  >
                    {{ footerItem.payload }}
                  </div>
                  <div
                    v-else-if="footerItem.type === 'Description'"
                    :key="footerItem.type"
                    style="display: flex; flex-direction: row; width: 100%"
                  >
                    <div class="demo-footer-key">
                      {{ footerItem.payload.key }}
                    </div>
                    <div class="demo-footer-value">
                      {{ footerItem.payload.value }}
                    </div>
                  </div>
                </template>
              </div>
              <!-- Footer End -->
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="node-container">
          <el-row>
            <el-button type="warning" @click="addImage">新增圖片</el-button>
            <el-button type="primary" @click="addDescription"
              >新增敘述</el-button
            >
            <el-button type="success" @click="addButton">新增按鈕</el-button>
          </el-row>
          <el-select
            v-model="style"
            placeholder="請選擇"
            style="width: 100%; margin-top: 20px"
          >
            <el-option
              v-for="n in 6"
              :key="'樣式' + n"
              :label="'樣式' + n"
              :value="n"
            >
            </el-option>
          </el-select>
          <el-menu
            default-active="1"
            :collapse="isCollapse"
            @select="onSelectMenuItem"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>header</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="`header-${i}`"
                  :key="`header-${i}`"
                  v-for="(item, i) in menu.header.payload"
                  >{{ item.type }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>body</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="`body-${i}`"
                  :key="`body-${i}`"
                  v-for="(item, i) in menu.body.payload"
                  >{{ item.type }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>footer</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="`footer-${i}`"
                  :key="`footer-${i}`"
                  v-for="(item, i) in menu.footer.payload"
                  >{{ item.type }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="8" class="form-container">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item :label="selectMenuItem.type"></el-form-item>
            <el-form-item
              label="顯示文字"
              v-if="selectMenuItem.type === 'Badge'"
            >
              <el-input type="text" v-model="selectMenuItem.payload"></el-input>
            </el-form-item>
            <el-form-item
              :label="'按鈕' + index + '文字'"
              v-for="(button, index) in selectMenuItem.type === 'Buttons'
                ? selectMenuItem.payload
                : []"
              :key="button.payload"
            >
              <el-input type="text" v-model="button.payload"></el-input>
            </el-form-item>
            <el-form-item
              :label="'按鈕文字'"
              v-if="selectMenuItem.type === 'Button'"
            >
              <el-input type="text" v-model="selectMenuItem.payload"></el-input>
            </el-form-item>
            <el-form-item
              :label="'標題文字'"
              v-if="selectMenuItem.type === 'Description'"
            >
              <el-input
                type="text"
                v-model="selectMenuItem.payload.key"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'內容文字'"
              v-if="
                selectMenuItem.type === 'Description' &&
                selectMenuItem.payload.value
              "
            >
              <el-input
                type="text"
                v-model="selectMenuItem.payload.value"
              ></el-input>
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
import * as Mock from "@/mock";
import _ from "lodash";
export default {
  name: "App",
  components: {},
  watch: {
    style: {
      handler(newValue) {
        console.log(Mock[`style${newValue}`]);
        this.menu = Mock[`style${newValue}`];
      },
      immediate: false,
    },
  },
  data() {
    return {
      selectMenuIndex: "header-0",
      menu: Mock.style1,
      form: {},
      style: 1,
      ratio: 1,
      isCollapse: false,
      showClipper: false,
      imgUrl:
        "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      qrCodeUrl:
        "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
    };
  },
  methods: {
    onSelectMenuItem(index) {
      this.selectMenuIndex = index;
    },
    addImage() {
      const newImage = {
        type: "圖片",
        label: "圖片-" + (this.images.length + 1),
      };
      this.menu.push(newImage);
    },
    addDescription() {
      const newDescription = {
        type: "描述",
        label: "描述-" + (this.descriptions.length + 1),
        key: "key",
        value: "value",
      };
      this.menu.push(newDescription);
    },
    addButton() {
      const newButton = {
        type: "按鈕",
        label: "按鈕-" + (this.buttons.length + 1),
      };
      this.menu.push(newButton);
    },
  },
  computed: {
    selectMenuItem() {
      const [type, i] = this.selectMenuIndex.split("-");
      return this.menu[type].payload[i];
    },
  },
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
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &.style3 {
        .demo-message-button {
          display: none;
        }
      }
      .demo-message-badge {
        position: absolute;
        background-color: #ff334b;
        top: 20px;
        left: 20px;
        border-radius: 20px;
        font-size: 13px;
        color: #ffffff;
        padding: 3px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .demo-message-img {
        width: 100%;
        background-origin: center;
        background-position: center;
        background-size: cover;
        border-top-left-radius: 17px;
        border-top-right-radius: 17px;
        &.style1,
        &.style2 {
          height: 300px;
          border-bottom-left-radius: 17px;
          border-bottom-right-radius: 17px;
        }
        &.style3,
        &.style4,
        &.style5 {
          height: 195px;
        }
      }
      .demo-message-button {
        position: absolute;
        bottom: 20px;
        border-radius: 12px;
        padding: 12px 16px;
        background-color: rgb(220, 223, 229);
        font-size: 20px;
        color: rgb(68, 68, 68);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .demo-description-box {
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .demo-description-key {
          font-size: 22px;
          color: #fff;
        }
        .demo-description-value {
          font-size: 16px;
          margin-top: 3px;
          color: #fff;
        }
      }
    }
    .demo-message-body {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      &.style1,
      &.style2 {
        display: none;
      }
      &.style3,
      &.style4,
      &.style5 {
        border-bottom-left-radius: 17px;
        border-bottom-right-radius: 17px;
      }
      &.style6 {
        border-radius: 17px;
        .demo-description-box {
          width: 100%;
          height: 30px;
          .demo-description-key {
            color: #555;
          }
          .demo-description-value {
            flex: 1;
            text-align: right;
            color: #111;
          }
        }
        .demo-text-p {
          color: #aaaaaa;
        }
      }
      &.style4 {
        background-color: #464f69;
        .demo-text-label {
          color: #fff;
        }
        .demo-description-box {
          margin-top: -4px;
          margin-bottom: 8px;
          .demo-description-key {
            color: #fff;
          }
          .demo-description-value {
            color: #fff;
          }
        }
        .demo-text-p {
          color: rgb(255, 255, 255);
        }
      }
      &.style5 {
        .demo-description-box {
          .demo-description-key {
            width: 51px;
          }
        }
      }
      .demo-message-badge {
        color: rgb(29, 180, 70);
        margin-bottom: 8px;
      }
      .demo-message-separator {
        border-bottom: 1px rgb(212, 214, 218) solid;
        padding-top: 20px;
        margin-bottom: 20px;
        width: 100%;
      }
      .demo-text-label {
        color: rgb(68, 68, 68);
        font-weight: 700;
        font-size: 22px;
        margin-bottom: 12px;
      }
      .demo-buttons-box {
        display: flex;
        width: 100%;
        .demo-buttons-button {
          flex: 1;
          font-size: 16px;
          font-weight: 400;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #42659a;
        }
        &.vertical {
          flex-direction: column;
          .demo-buttons-button {
            padding: 8px 0;
            box-sizing: content-box;
          }
        }
        &.horizontal {
          flex-direction: row;
          justify-content: space-between;
          margin-top: 20px;
        }
      }
      .demo-description-box {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .demo-description-key {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: rgb(170, 170, 170);
        }
        .demo-description-value {
          font-size: 14px;
          flex: 1;
          margin-left: 3px;
          font-weight: 400;
          line-height: 20px;
          color: rgb(102, 102, 102);
        }
      }
      .demo-message-img {
        width: 140px;
        height: 140px;
        background-size: cover;
        margin: 20px auto;
      }
    }
    .demo-message-footer {
      display: flex;
      flex-direction: row;
      width: 100%;
      .demo-text-note {
        font-size: 13px;
        font-weight: normal;
        color: rgb(170, 170, 170);
      }
      .demo-footer-key {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: rgb(170, 170, 170);
      }
      .demo-footer-value {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: rgb(170, 170, 170);
        flex: 1;
        text-align: right;
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