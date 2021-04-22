let txtDiv = document.querySelector('#txt')
let video = document.querySelector('#video')
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
let getGray = (r, g, b) => {
  return 0.299 * r + 0.578 * g + 0.114 * b;
}

// 转换
const init = () => {
  let canvas = document.querySelector('#canvas');
  //设置canvas的属性
  canvas.width = video.width
  canvas.height = video.height;
  //绘制2d canvas,再将 img 图片放入canvs 0,0的坐标上
  canvas.getContext('2d').drawImage(img, 0, 0);
  let imgData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
  let da'ta = imgData.data;
  let imgDataWidth = imgData.width;
  let imgDataHeight = imgData.height;
  console.log(imgData);


  txtDiv.style.width = img.width + 'px';
  let html = '';
  for (h = 0; h < imgDataHeight; h += 12) {
    let p = '<p>';
    for (w = 0; w < imgDataWidth; w += 6) {
      let index = (w + imgDataWidth * h) * 4;
      let r = imgDataArr[index + 0];
      let g = imgDataArr[index + 1];
      let b = imgDataArr[index + 2];
      let gray = getGray(r, g, b);
      p += toText(gray);
    }
    p += '</p>';
    html += p;
  }
  txtDiv.innerHTML = html;
}



const captureImage = (scale) => {
  let canvas = document.createElement("canvas");
  canvas.width = video.width * scale;
  canvas.height = video.height * scale;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
  //将canvas转换为图片文件
  img.src = canvas.toDataURL("image/png");
  //实际视频是4/3比例,
  img.width = video.width
  img.height = video.height;
  img.onload = init
}
video.addEventListener('loadeddata', () => {
  let timer = setInterval(() => {
    captureImage(1)
  }, 1);
})
