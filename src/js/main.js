import "/scss/style.scss";
import p5 from "p5";

const sketch = (p5) => {
  let img;
  // let drawingTime = 1;
  // let time = 0;
  // let length = 50;
  let draw = [];
  let mouseOver = false;
  let isDrawing = false;
  let mouse = { x: 0, y: 0 };

  p5.preload = () => {
    img = p5.loadImage("/img/img1.jpg");
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.smooth();
    p5.image(img, p5.windowWidth/2 - 250, p5.windowHeight/2 - 250, 500, 500);

    const canvas = document.querySelector('canvas');

    canvas.addEventListener('mouseover', () => {
      mouseOver = true;
    });
    canvas.addEventListener('mouseout', () => {
      mouseOver = false;
    });
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  };

  p5.draw = () => {
    // マウスの位置の色を取得
    const color = p5.get(mouse.x, mouse.y);
    const r = color[0];
    const g = color[1];
    const b = color[2];

    // 極端な黒白系の色は追加しない
    if (judgeColor(r, g, b)){
      // 長さの決定
      length = p5.random(50, 500);
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

    // 描画
    draw.forEach((d) => {
      if (d.mouseY < d.length) {
        drawLine(p5, d.mouseX, d.mouseY, d.r, d.g, d.b, 5);
        d.mouseY += 5;
        if (d.r !== 255 && d.g !== 255 && d.b !== 255) {
          d.r += 3;
          d.g += 3;
          d.b += 3;
        }
      }
    });
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