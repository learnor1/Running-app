"use strict";
const common_vendor = require("../../common/vendor.js");
const request_index = require("../../request/index.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _component_van_search = common_vendor.resolveComponent("van-search");
  _component_van_search();
}
const _sfc_main = {
  __name: "school",
  setup(__props) {
    const search = common_vendor.ref();
    const store = new stores_counter.Store();
    const schoolList = common_vendor.ref([]);
    common_vendor.onLoad(async () => {
      await request_index.request({
        url: "school/list/page/vo",
        method: "POST",
        data: {
          "city": "",
          "createTime": "",
          "current": 0,
          "id": 0,
          "isDelete": 0,
          "pageSize": 10,
          "province": "",
          "school_name": "",
          "sortField": "",
          "sortOrder": "",
          "updateTime": "",
          "user_id": 0
        }
      }).then((res) => {
        schoolList.value = [];
        schoolList.value = res.data.data.records;
        schoolList.value.forEach((i) => {
          i.isShow = true;
        });
        console.log(schoolList.value);
      });
    });
    const getSchool = () => {
      schoolList.value.forEach((i) => {
        if (i.school_name.includes(search.value.__data__.value) || i.city.includes(search.value.__data__.value) || i.province.includes(search.value.__data__.value)) {
          i.isShow = true;
        } else {
          i.isShow = false;
        }
      });
    };
    const selectSchool = (i) => {
      store.SchoolId = i.id;
      store.SchoolName = i.school_name;
      console.log(store.SchoolId, store.SchoolName);
      common_vendor.index.setStorageSync("schoolId", i.id);
      common_vendor.index.setStorageSync("schoolName", i.school_name);
      common_vendor.index.switchTab({
        url: "../../pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(search, "528bd108-0", {
          "k": "search"
        }),
        b: common_vendor.o(getSchool),
        c: common_vendor.p({
          label: "学校",
          placeholder: "请输入学校名称",
          background: "#4fc08d",
          shape: "round"
        }),
        d: common_vendor.f(schoolList.value, (i, k0, i0) => {
          return common_vendor.e({
            a: i.isShow
          }, i.isShow ? {
            b: common_vendor.t(i.school_name),
            c: common_vendor.o(($event) => selectSchool(i), i.id)
          } : {}, {
            d: i.id
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/frontendcode/project/wx-Running/wx-Running-master/subpages/school/school.vue"]]);
wx.createPage(MiniProgramPage);
