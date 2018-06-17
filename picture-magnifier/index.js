window.onload = () => {
  let imgList = document.getElementsByClassName("magnifier-item")[0]; // 图片选择列表
  let targetImg = document.querySelector(".magnifier-pic img"); // 展示选中的图片
  let smallImg = imgList.querySelectorAll("img"); // 选中的图片
  let showDetail = document.getElementsByClassName("magnifier-show")[0]; // 放大显示区
  let area = document.getElementsByClassName("magnifier-area")[0];

  // 监听鼠标移动事件，展示选中图片
  imgList.addEventListener("mousemove", e => {
    let target = e.target;
    if (target.tagName === "IMG" && target.className === "") {
      targetImg.src = target.src;
      showDetail.style.backgroundImage = `url(${target.src})`;
      smallImg.forEach(item => (item.className = ""));
      target.className = "magnifier-selected";
    }
  });

  // 全局监听鼠标移动事件，设置放大镜跟随
  window.addEventListener("mousemove", e => {
    let cx = e.clientX - targetImg.getBoundingClientRect().left; // 当前鼠标x坐标 - 图片区距离页面左边框距离 = 鼠标距图片左边框距离
    let cy = e.clientY - targetImg.getBoundingClientRect().top;

    if (cx > 0 && cx < 360 && cy > 0 && cy < 400) {
      area.style.display = "block";
      showDetail.style.display = "block";
      // 使放大镜不会跑出图片显示区域
      cx = cx < 50 ? 50 : cx;
      cx = cx > 310 ? 310 : cx;
      cy = cy < 50 ? 50 : cy;
      cy = cy > 350 ? 350 : cy;

      cx -= 50; // 减去一半，使鼠标位于中心点
      cy -= 50;
      area.style.left = cx + "px";
      area.style.top = cy + "px";

      showDetail.style.backgroundPosition = `${(cx * 100) / 260}% ${(cy * 100) /
        300}%`;
    } else {
      area.style.display = "none";
      showDetail.style.display = "none";
    }
  });
};
