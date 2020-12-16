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
                  :key="headerItem._id"
                >
                  {{ headerItem.payload }}
                </div>
                <div
                  class="demo-message-img"
                  :class="'style' + style"
                  v-else-if="headerItem.type === 'Image'"
                  :key="headerItem._id"
                  :style="`background-image:url(${headerItem.payload})`"
                ></div>
                <div
                  class="demo-message-button"
                  :class="'style' + style"
                  v-else-if="headerItem.type === 'Button'"
                  :key="headerItem._id"
                >
                  {{ headerItem.payload }}
                </div>
                <div
                  class="demo-description-box"
                  v-else-if="headerItem.type === 'Description'"
                  :key="headerItem.payload._id"
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
                  :key="bodyItem._id"
                >
                  {{ bodyItem.payload }}
                </div>
                <div
                  class="demo-text-label"
                  v-else-if="bodyItem.type === 'Label'"
                  :key="bodyItem._id"
                >
                  {{ bodyItem.payload }}
                </div>
                <div
                  class="demo-description-box"
                  v-else-if="bodyItem.type === 'Description'"
                  :key="bodyItem.payload._id"
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
                  :key="bodyItem._id"
                >
                  <div
                    class="demo-buttons-button"
                    v-for="button in bodyItem.payload"
                    :key="button._id"
                  >
                    {{ button.payload }}
                  </div>
                </div>
                <div
                  class="demo-message-img"
                  v-else-if="bodyItem.type === 'Image'"
                  :key="bodyItem._id"
                  :style="`background-image:url(${bodyItem.payload})`"
                ></div>
                <div
                  class="demo-message-separator"
                  v-else-if="bodyItem.type === 'Separator'"
                  :key="bodyItem._id"
                ></div>
                <div
                  class="demo-text-p"
                  v-else-if="bodyItem.type === 'P'"
                  :key="bodyItem._id"
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
                    :key="footerItem._id"
                  >
                    {{ footerItem.payload }}
                  </div>
                  <div
                    v-else-if="footerItem.type === 'Description'"
                    :key="footerItem._id"
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
            <el-dropdown style="margin-right: 12px" @command="addNode">
              <el-button
                type="primary"
                icon="el-icon-plus"
                :disabled="canAddItems.length == 0"
              ></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, key) in canAddItems"
                  :key="key"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <el-button icon="el-icon-arrow-up" @click="nodeUp"></el-button>
            <el-button icon="el-icon-arrow-down" @click="nodeDown"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              :disabled="!canRemove"
              @click="removeSelectedNode"
            ></el-button>
          </el-row>
          <el-select
            v-model="style"
            placeholder="請選擇"
            style="width: 100%; margin: 20px 0"
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
              :key="button._id"
            >
              <el-input type="text" v-model="button.payload"></el-input>
            </el-form-item>
            <el-form-item
              :label="'顯示文字'"
              v-if="
                selectMenuItem.type === 'Button' ||
                selectMenuItem.type === 'Label' ||
                selectMenuItem.type === 'P' ||
                selectMenuItem.type === 'Note'
              "
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
            <el-form-item
              :label="'圖片管理'"
              v-if="selectMenuItem.type === 'Image'"
            >
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                list-type="picture"
                :file-list="[
                  { name: 'default.jpg', url: selectMenuItem.payload },
                ]"
                :on-change="beforeUpload"
                :multiple="false"
              >
                <el-button size="small" type="primary">更換圖片</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上傳jpg/png文件，且不超過1mb
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog title="剪裁圖片" :visible.sync="showClipper">
        <clipper-basic
          ref="clipper"
          :src="selectMenuItem.payload"
          :ratio="ratio"
          class="form-clip-container"
        />
        <span slot="footer" class="dialog-footer">
          <el-button>取消</el-button>
          <el-button type="primary" @click="clipImg">剪裁</el-button>
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
        this.selectMenuIndex =
          Mock[`style${newValue}`].header.payload.length > 0
            ? "header-0"
            : "body-0";
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
    addNode(type) {
      switch (type) {
        case "Description":
          let node = {
            _id: nanoid(),
            type: "Description",
            payload: {
              key: "欄位",
              value: "段落",
            },
          };
          this.menu.body.payload.push(node);
          break;

        default:
          break;
      }
      this.$forceUpdate();
    },
    onSelectMenuItem(index) {
      this.selectMenuIndex = index;
    },
    beforeUpload(file) {
      this.transformFile(file);
      return false;
    },
    transformFile(file) {
      // if (this.imageConfig.image) URL.revokeObjectURL(this.imageConfig.image);
      this.selectMenuItem.payload = file.url;
      // this.imageConfig.image = file.raw;
      this.showClipper = true;
    },
    clipImg() {
      this.showClipper = false;
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      this.selectMenuItem.payload = canvas.toDataURL("image/jpeg", 1);
    },
    nodeUp() {
      const [type, i] = this.selectMenuIndex.split("-");
      if (i === 0 || this.menu[type].payload.length === 1) {
        return;
      }
      this.menu[type].payload = this.swapArrayLocs(
        this.menu[type].payload,
        parseInt(i),
        parseInt(i) - 1
      );
      this.selectMenuIndex = [type, parseInt(i) - 1].join("-");
      this.$forceUpdate();
    },
    nodeDown() {
      const [type, i] = this.selectMenuIndex.split("-");
      if (
        this.menu[type].payload.length === 1 ||
        i === this.menu[type].payload.length - 1
      ) {
        return;
      }
      this.menu[type].payload = this.swapArrayLocs(
        this.menu[type].payload,
        parseInt(i),
        parseInt(i) + 1
      );
      this.selectMenuIndex = [type, parseInt(i) + 1].join("-");
      this.$forceUpdate();
    },
    swapArrayLocs(arr, index1, index2) {
      const temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
      return arr;
    },
    removeSelectedNode() {
      const [type, i] = this.selectMenuIndex.split("-");
      if (this.selectMenuItem.type === "Buttons") {
        if (this.selectMenuItem.payload.length === 1) {
          return;
        }
        this.selectMenuItem.payload = this.selectMenuItem.payload.slice(
          0,
          this.selectMenuItem.payload.length - 1
        );
      } else {
        this.selectMenuIndex =
          this.menu.header.payload.length > 0 ? "header-0" : "body-0";
        this.menu[type].payload = this.menu[type].payload
          .slice(0, i)
          .concat(this.menu[type].payload.slice(parseInt(i) + 1));
      }
      this.$forceUpdate();
    },
  },
  computed: {
    selectMenuItem() {
      const [type, i] = this.selectMenuIndex.split("-");
      return this.menu[type].payload[i];
    },
    canAddItems() {
      let nodes = [];
      switch (this.style) {
        case 1:
          return [];
        case 2:
          return [];
        case 3:
          nodes.push("Description");
          const Buttons = this.menu.body.payload.find(
            (item) => item.type === "Buttons"
          );
          if (Buttons && Buttons.payload.length <= 3) {
            nodes.push("Button");
          }
          return nodes;

        case 4:
          return [];
        case 5:
          return [];
        case 6:
          return [];
      }
    },
    canRemove() {
      switch (this.style) {
        case 1:
          return false;
        case 2:
          return false;
        case 3:
          if (
            this.selectMenuItem.type == "Description" &&
            this.menu.body.payload.filter((item) => item.type === "Description")
              .length >= 0
          ) {
            return true;
          } else if (
            this.selectMenuItem.type == "Buttons" &&
            this.menu.body.payload.find((item) => item.type === "Buttons")
              .payload.length >= 1
          )
            return true;
        case 4:
          return false;
        case 5:
          return false;
        case 6:
          return false;
      }
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
  overflow-y: scroll;
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