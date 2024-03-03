"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
const request_index = require("../../request/index.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  (_component_van_field + _component_van_button + _component_van_cell_group + _component_van_overlay)();
}
const _sfc_main = {
  __name: "takeaway",
  setup(__props) {
    const store = stores_counter.Store();
    const storedCookie = common_vendor.index.getStorageSync("sessionCookie");
    let from = {
      name: null,
      phone: null,
      code: null
    };
    const a = common_vendor.ref(true);
    const sendCodeBtn = common_vendor.ref(false);
    const sendCodeText = common_vendor.ref("发送验证码");
    const getUserName = (e) => {
      if (e.detail.value.trim().length != 0) {
        from.name = e.detail.value;
        a.value = true;
      } else {
        a.value = false;
      }
    };
    var pattern = /^1[3456789]\d{9}$/;
    const getPhone = (e) => {
      if (pattern.test(e.detail.value)) {
        from.phone = e.detail.value;
        a.value = true;
      } else {
        a.value = false;
      }
      console.log(from.phone);
    };
    const getCode = (e) => {
      from.code = e.detail.value;
    };
    let timeOut = common_vendor.ref(null);
    const sendSms = () => {
      if (!timeOut.value) {
        timeOut.value = setTimeout(() => {
          sendCodeBtn.value = false;
          if (from.phone === null) {
            console.log("手机号为Nu11，请输入规范手机号");
          } else {
            let second = 5;
            let timer1 = setInterval(() => {
              sendCodeText.value = `${second--}秒后发送`;
              if (second < 0) {
                sendCodeText.value = "发送验证码";
                sendCodeBtn.value = false;
                clearInterval(timer1);
              }
            }, 1e3);
            request_index.request({
              url: "sms/sendcode",
              method: "GET",
              header: {
                "content-type": "application/json",
                "Cookie": storedCookie
              },
              data: {
                "phone": from.phone
              }
            }).then((res) => {
              sendCodeBtn.value = true;
              console.log("发送验证码成功 一分钟有效：" + res);
              timeOut.value = null;
            });
          }
        }, 800);
      }
    };
    const showWarning = common_vendor.ref(false);
    const msg = common_vendor.ref("");
    const register = async () => {
      if (a.value) {
        await request_index.request({
          url: "runningUser/add",
          method: "POST",
          header: {
            "content-type": "application/json",
            "Cookie": storedCookie
          },
          data: {
            "name": from.name,
            "phone": from.phone,
            "userId": store.userId,
            "code": from.code,
            "schoolId": 1
          }
        }).then((res) => {
          if (res.data.code == 0) {
            msg.value = "注册成功！";
            showWarning.value = true;
            setTimeout(() => {
              showWarning.value = false;
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            }, 1200);
          } else {
            msg.value = "注册失败,请检查输入信息是否正确！";
            showWarning.value = true;
            setTimeout(() => {
              showWarning.value = false;
            }, 800);
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getUserName),
        b: common_vendor.p({
          placeholder: "请输入真实姓名",
          label: "姓名:",
          required: true,
          maxlength: 6
        }),
        c: common_vendor.o(getPhone),
        d: common_vendor.p({
          label: "手机:",
          placeholder: "请输入手机号",
          required: true,
          maxlength: 11,
          type: "number"
        }),
        e: common_vendor.t(sendCodeText.value),
        f: common_vendor.o(sendSms),
        g: common_vendor.p({
          size: "small",
          disabled: sendCodeBtn.value,
          type: "primary"
        }),
        h: common_vendor.o(getCode),
        i: common_vendor.p({
          center: true,
          clearable: true,
          label: "短信验证码",
          required: true,
          placeholder: "请输入短信验证码",
          maxlength: 6
        }),
        j: common_vendor.o(register),
        k: common_vendor.p({
          type: "primary",
          round: true,
          size: "large"
        }),
        l: common_vendor.t(msg.value),
        m: common_vendor.p({
          show: showWarning.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/frontendcode/project/wx-Running/wx-Running-master/subpages/takeaway/takeaway.vue"]]);
wx.createPage(MiniProgramPage);
