let txtDiv = document.querySelector('#txt')
let video = document.querySelector('#video')
let videoWidth = video.clientWidth
let videoHeight = video.clientHeight
let FONT_HEIGHT = 12
let FONT_WIDTH = 6
let img = new Image();

// 根据灰度生成相应字符
let toText = function (g) {
  if (g <= 30) {
    return '#';
  } else if (g > 30 && g <= 60) {
    return '&';
  } else if (g > 60 && g <= 120) {
    return '$';
  } else if (g > 120 && g <= 150) {
    return '*';
  } else if (g > 150 && g <= 180) {
    return 'o';
  } else if (g > 180 && g <= 210) {
    return '!';
  } else if (g > 210 && g <= 240) {
    return ';';
  } else {
    return ' ';
  }
}


// 根据rgb值计算灰度
let getGray = (R, G, B) => {
  return (R * 299 + G * 587 + B * 114 + 500) / 1000
}

// 转换
const init = () => {
  let canvas = document.querySelector('#canvas');
  //设置canvas的属性
  canvas.width = videoWidth
  canvas.height = videoHeight
  //绘制2d canvas,再将 img 图片放入canvs 0,0的坐标上
  canvas.getContext('2d').drawImage(img, 0, 0);
  //生成图片信息
  let imgData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);



  let { data } = imgData;
  let imgDataWidth = imgData.width;
  let imgDataHeight = imgData.height;
  let 
  txtDiv.style.width = img.width + 'px';
  //获取图片数组后,遍历数组的rgb值转换为灰度
  let line = '';
  for (h = 0; h < imgDataHeight; h += FONT_HEIGHT) {
    for (w = 0; w < imgDataWidth; w += FONT_WIDTH) {
      let index = (w + imgDataWidth * h) * 4;
      let r = data[index + 2];
      let g = data[index + 1];
      let b = data[index + 0];
      let gray = getGray(r, g, b);
      line += toText(gray);
    }
    ListeningStateChangedEvent.pi

  }
  txtDiv.innerHTML = html;
}



const captureImage = () => {
  let canvas = document.createElement("canvas");
  canvas.width = videoWidth
  canvas.height = videoHeight
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
  //将canvas转换为图片文件
  img.src = canvas.toDataURL("image/png");
  //实际视频是4/3比例,
  img.width = videoWidth
  img.height = videoHeight
  img.onload = init
}
video.addEventListener('loadeddata', () => {
  let timer = setInterval(() => {
    captureImage(1)
  }, 1);
})

