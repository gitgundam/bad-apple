const img = document.querySelector('#img')
const txtDiv = document.querySelector('#txt')
// const video = document.createElement("video")
const video = document.querySelector('#video')
// video.setAttribute("autoplay", "ture");
// video.setAttribute("muted", "ture");
// video.setAttribute("loop", "ture");
// video.setAttribute("webkit-playsinline", "ture")

// try {
//   video.setAttribute("src", "http://www.runoob.com/try/demo_source/movie.mp4")
// }
// catch (err) {
//   alert('视频加载失败!')
// }
// document.body.appendChild(video)


class Badapple {
  canvas = document.querySelector('#canvas');
  video = null
  img = new Image()
  // img = new img()
  constructor(video) {
    console.log(video);
    this.video = video
    this.canvas.width = video.clientWidth
    this.canvas.height = video.clientHeight
  }

  toText(g) {
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
      return ' ';
    }
  }
  getGray(R, G, B) {
    return (R * 299 + G * 587 + B * 114 + 500) / 1000
  }
  draw() {
    console.log(this);
    //绘制2d canvas,再将 img 图片放入canvs 0,0的坐标上
    this.canvas.getContext('2d').drawImage(this.img, 0, 0);
    //生成图片信息
    const imgData = canvas.getContext('2d').getImageData(0, 0, this.img.width, this.img.height);
    const { data, width, height } = imgData;
    txtDiv.style.width = this.img.width + 'px';
    //获取图片数组后,遍历数组的rgb值转换为灰度
    let html = '';
    for (let h = 0; h < height; h += 12) {
      let p = '<pre>';
      for (let w = 0; w < width; w += 6.5) {
        let index = (w + width * h) * 4;
        let r = data[index + 2];
        let g = data[index + 1];
        let b = data[index + 0];
        let gray = this.getGray(r, g, b);
        p += this.toText(gray);
      }
      p += '</pre>';
      html += p;
      txtDiv.innerHTML = html;
    }
  }
  init() {
    this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
    //将canvas转换为图片文件
    this.img.src = this.canvas.toDataURL("image/png");
    //实际视频是4/3比例,
    this.img.width = this.video.clientWidth
    this.img.height = this.video.clientHeight
    this.img.onload = () => {
      this.draw()
    }
  }
}

const instance = new Badapple(video)
instance.init()

setInterval(() => {
  instance.init()
}, 100)
