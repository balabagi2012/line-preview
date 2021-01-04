<template>
  <el-container class="line-preview">
    <el-header class="header">
      <h1>Line Preview</h1>
      <el-button type="primary" icon="el-icon-upload" @click="exportData"
        >輸出
      </el-button>
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
                  {{
                    headerItem.payload.length > 10
                      ? headerItem.payload.slice(0, 10) + "..."
                      : headerItem.payload
                  }}
                </div>
                <a
                  class="demo-message-img"
                  target="_blank"
                  :class="[
                    'style' + style,
                    'count' + headerImgs.length,
                    'image' +
                      (headerImgs.findIndex((i) => i._id === headerItem._id) +
                        1),
                  ]"
                  :href="headerItem.payload.link"
                  v-else-if="headerItem.type === 'Image'"
                  :key="headerItem._id"
                  :style="`background-image:url(${headerItem.payload.url})`"
                ></a>
                <a
                  class="demo-message-button"
                  :class="'style' + style"
                  target="_blank"
                  v-else-if="headerItem.type === 'Button'"
                  :key="headerItem._id"
                  :href="headerItem.payload.link"
                >
                  {{
                    headerItem.payload.text.length > 10
                      ? headerItem.payload.text.slice(0, 10) + "..."
                      : headerItem.payload.text
                  }}
                </a>
                <div
                  class="demo-description-box"
                  v-else-if="headerItem.type === 'Description'"
                  :key="headerItem.payload._id"
                >
                  <div class="demo-description-key">
                    {{
                      headerItem.payload.key.length > 10
                        ? headerItem.payload.key.slice(0, 10) + "..."
                        : headerItem.payload.key
                    }}
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
                  {{
                    bodyItem.payload.length > 10
                      ? bodyItem.payload.slice(0, 10) + "..."
                      : bodyItem.payload
                  }}
                </div>
                <div
                  class="demo-text-label"
                  v-else-if="bodyItem.type === 'Label'"
                  :key="bodyItem._id"
                >
                  {{
                    bodyItem.payload.length > 10
                      ? bodyItem.payload.slice(0, 10) + "..."
                      : bodyItem.payload
                  }}
                </div>
                <div
                  class="demo-description-box"
                  v-else-if="bodyItem.type === 'Description'"
                  :key="bodyItem.payload._id"
                >
                  <div
                    class="demo-description-key"
                    v-if="[3, 5, 6].includes(style)"
                  >
                    {{
                      bodyItem.payload.key.length > 3
                        ? bodyItem.payload.key.slice(0, 3) + "..."
                        : bodyItem.payload.key
                    }}
                  </div>
                  <div class="demo-description-key" v-else>
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
                  <a
                    class="demo-buttons-button"
                    v-for="button in bodyItem.payload"
                    :key="button._id"
                    target="_blank"
                    :href="button.payload.link"
                  >
                    {{
                      button.payload.text.length > 10
                        ? button.payload.text.slice(0, 10) + "..."
                        : button.payload.text
                    }}
                  </a>
                </div>
                <div
                  class="demo-message-img"
                  v-else-if="bodyItem.type === 'Image'"
                  :key="bodyItem._id"
                  :style="`background-image:url(${bodyItem.payload.url})`"
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
                  {{
                    bodyItem.payload.length > 400
                      ? bodyItem.payload.slice(0, 400) + "..."
                      : bodyItem.payload
                  }}
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
                    {{
                      footerItem.payload.length > 400
                        ? footerItem.payload.slice(0, 400) + "..."
                        : footerItem.payload
                    }}
                  </div>
                  <div
                    v-else-if="footerItem.type === 'Description'"
                    :key="footerItem._id"
                    style="display: flex; flex-direction: row; width: 100%"
                  >
                    <div class="demo-footer-key">
                      {{
                        footerItem.payload.key.length > 10
                          ? footerItem.payload.key.slice(0, 10) + "..."
                          : footerItem.payload.key
                      }}
                    </div>
                    <div class="demo-footer-value">
                      {{
                        footerItem.payload.value.length > 400
                          ? footerItem.payload.value.slice(0, 400) + "..."
                          : footerItem.payload.value
                      }}
                    </div>
                  </div>
                </template>
              </div>
              <!-- Footer End -->
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="node-container">
          <el-row class="node-tools">
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
            <el-button
              icon="el-icon-arrow-up"
              @click="nodeUp"
              :disabled="!canUp"
            ></el-button>
            <el-button
              icon="el-icon-arrow-down"
              @click="nodeDown"
              :disabled="!canDown"
            ></el-button>
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
          <el-col :span="24" class="node-menu">
            <el-menu
              :default-active="activeIndex"
              :collapse="isCollapse"
              @select="onSelectMenuItem"
              background-color="transparent"
              text-color="#fff"
              active-text-color="#ffd04b"
              ref="menu"
            >
              <el-submenu index="1" v-if="menu.header.payload.length > 0">
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
              <el-submenu index="2" v-if="menu.body.payload.length > 0">
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
              <el-submenu index="3" v-if="menu.footer.payload.length > 0">
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
        </el-col>
        <el-col :span="8" class="form-container">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item :label="selectMenuItem.type"></el-form-item>
            <el-form-item
              label="顯示文字"
              v-if="selectMenuItem.type === 'Badge'"
            >
              <el-input
                type="text"
                v-model="selectMenuItem.payload"
                :maxlength="14"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'按鈕樣式'"
              v-if="selectMenuItem.type === 'Buttons'"
            >
              <el-select v-model="selectMenuItem.style">
                <el-option label="horizontal" value="horizontal"></el-option>
                <el-option label="vertical" value="vertical"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="'按鈕' + (index + 1) + '文字'"
              v-for="(button, index) in selectMenuItem.type === 'Buttons'
                ? selectMenuItem.payload
                : []"
              :key="button._id + 'text'"
            >
              <el-input
                type="text"
                maxlength="10"
                v-model="button.payload.text"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'按鈕' + (index + 1) + '連結'"
              v-for="(button, index) in selectMenuItem.type === 'Buttons'
                ? selectMenuItem.payload
                : []"
              :key="button._id + 'link'"
            >
              <el-input type="text" v-model="button.payload.link"></el-input>
            </el-form-item>

            <el-form-item
              :label="'顯示文字'"
              v-if="selectMenuItem.type === 'Label'"
            >
              <el-input
                type="text"
                maxlength="10"
                v-model="selectMenuItem.payload"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'顯示文字'"
              v-if="
                selectMenuItem.type === 'P' || selectMenuItem.type === 'Note'
              "
            >
              <el-input
                type="text"
                v-model="selectMenuItem.payload"
                maxlength="400"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'顯示文字'"
              v-if="selectMenuItem.type === 'Button'"
            >
              <el-input
                type="text"
                maxlength="8"
                v-model="selectMenuItem.payload.text"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'按鈕連結'"
              v-if="selectMenuItem.type === 'Button'"
            >
              <el-input
                type="text"
                v-model="selectMenuItem.payload.link"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'標題文字'"
              v-if="selectMenuItem.type === 'Description'"
            >
              <el-input
                type="text"
                v-model="selectMenuItem.payload.key"
                maxlength="400"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'內容文字'"
              v-if="
                selectMenuItem.type === 'Description' &&
                selectMenuItem.payload.value !== null
              "
            >
              <el-input
                type="text"
                maxlength="400"
                v-model="selectMenuItem.payload.value"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'圖片連結'"
              v-if="
                selectMenuItem.type === 'Image' &&
                selectMenuIndex.includes('header')
              "
            >
              <el-input
                type="text"
                v-model="selectMenuItem.payload.link"
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
                ref="uploadImg"
                accept="image/png, image/jpeg, image/jpg"
                :file-list="fileList"
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
          :src="selectMenuItem.payload.url"
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
      activeIndex: "header-0",
      selectMenuIndex: "header-0",
      menu: Mock.style1,
      form: {},
      style: 1,
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
      let node = {};
      switch (type) {
        case "Description":
          node = {
            _id: nanoid(),
            type: "Description",
            payload: {
              key: "欄位",
              value: "段落",
            },
          };
          if (this.style === 3) {
            this.menu.body.payload = this.menu.body.payload
              .slice(0, this.menu.body.payload.length - 1)
              .concat([node])
              .concat(
                this.menu.body.payload.slice(this.menu.body.payload.length - 1)
              );
          } else {
            this.menu.body.payload.push(node);
          }
          break;
        case "Button":
          node = {
            _id: nanoid(),
            type: "Button",
            payload: {
              link: "/",
              text: "按鈕",
            },
          };
          this.menu.body.payload
            .find((item) => item.type === "Buttons")
            .payload.push(node);
          break;
        case "Separator":
          node = {
            _id: nanoid(),
            type: "Separator",
          };
          this.menu.body.payload.push(node);
          break;
        case "Image":
          node = {
            _id: nanoid(),
            type: "Image",
            payload: {
              url: this.imgUrl,
              link: "/",
            },
          };
          this.menu.header.payload.push(node);
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
      if (file.size > 1024 * 1024 * 1) {
        this.$message.error("超過檔案大小限制");
        this.$refs.uploadImg.uploadFiles = this.$refs.uploadImg.uploadFiles.slice(
          0,
          1
        );
        return false;
      }
      this.transformFile(file);
      return false;
    },
    transformFile(file) {
      // if (this.imageConfig.image) URL.revokeObjectURL(this.imageConfig.image);
      this.selectMenuItem.payload.url = file.url;
      // this.imageConfig.image = file.raw;
      this.showClipper = true;
    },
    clipImg() {
      this.showClipper = false;
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      this.selectMenuItem.payload.url = canvas.toDataURL("image/jpeg", 1);
    },
    nodeUp() {
      if (!this.canUp) return;
      const [type, i] = this.selectMenuIndex.split("-");
      this.menu[type].payload = this.swapArrayLocs(
        this.menu[type].payload,
        parseInt(i),
        parseInt(i) - 1
      );
      this.selectMenuIndex = [type, parseInt(i) - 1].join("-");
      this.$refs.menu.activeIndex = [type, parseInt(i) - 1].join("-");
      this.$forceUpdate();
    },
    nodeDown() {
      if (!this.canDown) return;
      const [type, i] = this.selectMenuIndex.split("-");
      this.menu[type].payload = this.swapArrayLocs(
        this.menu[type].payload,
        parseInt(i),
        parseInt(i) + 1
      );
      this.selectMenuIndex = [type, parseInt(i) + 1].join("-");
      this.$refs.menu.activeIndex = [type, parseInt(i) + 1].join("-");
      this.$forceUpdate();
    },
    swapArrayLocs(arr, index1, index2) {
      const temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
      return arr;
    },
    exportData() {
      alert("查看Console");
      console.log(this.menu);
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
  computed: {
    fileList() {
      return [{ name: "default.jpg", url: this.selectMenuItem.payload.url }];
    },
    canUp() {
      const [type, i] = this.selectMenuIndex.split("-");
      return this.menu[type].payload.length > 1 && parseInt(i) !== 0;
    },
    canDown() {
      const [type, i] = this.selectMenuIndex.split("-");
      return (
        this.menu[type].payload.length > 1 &&
        parseInt(i) !== this.menu[type].payload.length - 1
      );
    },
    headerImgs() {
      return this.menu.header.payload.filter((item) => item.type === "Image");
    },
    ratio() {
      if (this.selectMenuIndex.includes("header")) {
        switch (this.style) {
          case 1:
          case 2:
            return 1;
          case 3:
          case 5:
            return 300 / 195;
          case 4:
            const headerImgs = this.menu.header.payload.filter(
              (item) => item.type === "Image"
            );
            if (headerImgs.length == 2) {
              return 300 / 195 / 2;
            } else if (headerImgs.length == 3) {
              const index = headerImgs.findIndex(
                (i) => i._id === this.selectMenuItem._id
              );
              return index === 0 ? 300 / 195 / 2 : 300 / 195;
            }
          default:
            break;
        }
      }
      return 1;
    },
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
          if (Buttons && Buttons.payload.length < 3) {
            nodes.push("Button");
          }
          return nodes;
        case 5:
          return ["Description"];
        case 4:
          const Images = this.headerImgs;
          if (Images && Images.length < 3) {
            nodes.push("Image");
          }
          return nodes;
        case 6:
          return ["Description", "Separator"];
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
            this.selectMenuItem.payload.length > 1
          )
            return true;
        case 5:
          return false;
        case 4:
          if (
            this.selectMenuItem.type == "Description" &&
            this.menu.body.payload.filter((item) => item.type === "Description")
              .length > 1
          ) {
            return true;
          } else if (
            this.selectMenuItem.type == "Image" &&
            this.menu.header.payload.filter((item) => item.type === "Image")
              .length > 1
          ) {
            return true;
          }
        case 6:
          if (
            this.selectMenuItem.type == "Description" &&
            this.menu.body.payload.filter((item) => item.type === "Description")
              .length > 1
          ) {
            return true;
          }
          if (this.selectMenuItem.type == "Separator") {
            return true;
          }
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.line-preview {
  font-family: "黑體-繁", "微軟正黑體";
}
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
  max-height: calc(100vh - 60px);
  overflow-y: scroll;
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
      overflow: hidden;
      border-top-left-radius: 17px;
      border-top-right-radius: 17px;
      box-sizing: border-box;
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
      > .demo-message-img {
        width: 100%;
        background-origin: center;
        background-position: center;
        background-size: cover;
        &.style1,
        &.style2 {
          height: 300px;
        }
        &.style3,
        &.style5 {
          height: 195px;
        }
        &.style4 {
          &.count1 {
            position: absolute;
            left: 0;
            top: 0;
            width: 300px;
            height: 195px;
          }
          &.count2 {
            &.image1 {
              position: absolute;
              width: 150px;
              height: 195px;
              left: 0;
              top: 0;
            }
            &.image2 {
              position: absolute;
              width: 150px;
              height: 195px;
              right: 0;
              top: 0;
            }
          }
          &.count3 {
            &.image1 {
              position: absolute;
              width: 150px;
              height: 195px;
              left: 0;
              top: 0;
            }
            &.image2 {
              position: absolute;
              width: 150px;
              height: calc(195px / 2);
              right: 0;
              top: 0;
            }
            &.image3 {
              position: absolute;
              width: 150px;
              height: calc(195px / 2);
              right: 0;
              bottom: 0;
            }
          }
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
        text-decoration: none;
        justify-content: center;
        align-items: center;
      }
      .demo-description-box {
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: calc(100% - 40px);
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
          display: block;
          text-align: left;
          word-break: break-all;
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
          text-decoration: none;
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
  max-height: calc(100vh - 60px);
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .node-menu {
    flex: 1;
    height: 100%;
    width: 100%;
    background-color: #333;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.form-container {
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #eee;
  padding: 16px;
  max-height: calc(100vh - 60px);
  overflow-y: scroll;
  .form-cliper-container {
    width: 500px;
    height: auto;
  }
}
</style>