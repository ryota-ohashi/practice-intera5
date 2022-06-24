import "/scss/style.scss";
import p5 from "p5";
import imgPath from "../img/img1.jpg"

const sketch = (p5) => {
  let img;
  let draw = [];
  let deleteIndex = [];
  let mouseOver = false;
  let isAnimating = false;
  let mouse = { x: 0, y: 0 };
  const windowWidth = p5.windowWidth;
  const windowHeight = p5.windowHeight;
  const imgWidth = 500;
  const imgHeight = 500;
  const minLength = 50;
  const maxLength = 500;
  const drawSpeed = 5;
  const rgbSpeed = 3;

  p5.preload = () => {
    img = p5.loadImage(imgPath);
  }

  p5.setup = () => {

    p5.createCanvas(windowWidth, windowHeight);
    p5.smooth();
    p5.image(img, windowWidth/2 - imgWidth/2, windowHeight/2 - imgHeight/2, imgWidth, imgHeight);

    window.addEventListener('mousemove', (e) => {

      // マウス位置
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // マウスオーバー判定
      if (mouse.x > windowWidth/2 - imgWidth/2 && mouse.x < windowWidth/2 + imgWidth/2 && mouse.y > windowHeight/2 - imgHeight/2 && mouse.y < windowHeight/2 + imgHeight/2) {
        mouseOver = true;
      }else{
        mouseOver = false;
      }

    });
  };

  p5.draw = () => {
    if (mouseOver) {
      // マウスの位置の色を取得
      const color = p5.get(mouse.x, mouse.y);
      const r = color[0];
      const g = color[1];
      const b = color[2];

      // 極端な黒白系の色は追加しない
      if (judgeColor(r, g, b)){
        // 長さの決定
        length = p5.random(minLength, maxLength);
        // 追加
        draw.push(
          {
            mouseX: mouse.x,
            mouseY: mouse.y,
            r: r,
            g: g,
            b: b,
            length: mouse.y + length
          }
        );
      }
    }

    // 描画要素があるかどうかを判定
    if (draw.length > 0) {
      isAnimating = true;
    }else{
      isAnimating = false;
    }

    if (isAnimating) {
      // 描画
      draw.forEach((d, i) => {

        if (d.mouseY < d.length) {

          drawLine(p5, d.mouseX, d.mouseY, d.r, d.g, d.b, drawSpeed);
          d.mouseY += drawSpeed;

          if (d.r !== 255 && d.g !== 255 && d.b !== 255) {
            d.r += rgbSpeed;
            d.g += rgbSpeed;
            d.b += rgbSpeed;
          }

        }else{
          deleteIndex.push(i);
        }

      });
      // 描画が終わったものを削除
      draw = draw.filter((d, index) => !deleteIndex.includes(index));
      deleteIndex = [];
    }

  };

  function drawLine(p5, x, y, r, g, b, length) {
    p5.strokeWeight(3);
    p5.noFill();
    p5.stroke(r, g, b);
    p5.line(x, y, x, y + length);
  }

  function judgeColor(r, g, b){
    if(r < 20 && g < 20 && b < 20) return false;
    if(r > 230 && b > 230 && g > 230) return false;
    return true
  };

};

new p5(sketch);