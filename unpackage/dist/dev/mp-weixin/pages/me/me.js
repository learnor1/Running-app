"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
require("../../request/index.js");
if (!Array) {
  const _component_van_image = common_vendor.resolveComponent("van-image");
  _component_van_image();
}
const _sfc_main = {
  __name: "me",
  setup(__props) {
    const store = stores_counter.Store();
    const userData = common_vendor.computed(() => {
      return store.userInfo;
    });
    const updateMe = () => {
      common_vendor.index.navigateTo({
        url: `/subpages/updateme/updateme`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          round: true,
          width: "200rpx",
          height: "200rpx",
          src: common_vendor.unref(userData).userAvatar
        }),
        b: common_vendor.t(common_vendor.unref(userData).userName),
        c: common_vendor.t(common_vendor.unref(userData).userMoney),
        d: common_vendor.o(($event) => updateMe())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/frontendcode/project/wx-Running/wx-Running-master/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
