let cv = document.getElementById('cv');
let c = cv.getContext('2d');//建立一个2D渲染上下文
let txtDiv = document.getElementById('txt')
let video = document.getElementById("video")


let img = new Image();
img.src = '/a.jpg';
; // 图片加载完开始转换
const initialize = () => {
  // let output = document.getElementById("output")
  video.addEventListener('loadeddata', ()=>{
    console.log(1);
  })
}

initialize()

const captureImage =()=>{
  let canvas = document.createElement("canvas");
  
}




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
let init = () => {
  txtDiv.style.width = img.width + 'px';
  cv.width = img.width;
  cv.height = img.height;
  c.drawImage(img, 0, 0);
  let imgData = c.getImageData(0, 0, img.width, img.height);
  let imgDataArr = imgData.data;
  let imgDataWidth = imgData.width;
  let imgDataHeight = imgData.height;
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

img.onload = init
