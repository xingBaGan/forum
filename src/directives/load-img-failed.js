export default {
  bind(el, binding) {
    el.__HandleErrorHandler__ = function (e) {
      // console.error("发生错误呢！" + e);
      // console.log(el.src);
      el.src = 'https://picgo-1300491698.cos.ap-nanjing.myqcloud.com/u=2751417450,3820337321&fm=26&gp=0.jpg'
    }

    el.addEventListener('error', el.__HandleErrorHandler__)
  },
  unbind(el) {
    // el.removeEventListener('error', el.__HandleErrorHandler__)
  }
}
