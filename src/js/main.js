import "/scss/style.scss";
import p5 from "p5";

const sketch = (p5) => {
  let img;
  // let drawingTime = 1;
  let time = 0;
  let length = 50;
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
    time += 1;
    if (mouseOver || isDrawing) {
      // 適当に間引く
      // if(time % 5 !== 0) return;
      // マウスの位置の色を取得
      const color = p5.get(mouse.x, mouse.y);
      const r = color[0];
      const g = color[1];
      const b = color[2];

      // 黒系の色だったら描画しない
      if (r < 20 && g < 20 && b < 20) return;

      // 線を引く
      // length = p5.random(30, 300);
      length = 1000;
      draw.push([mouse.x, mouse.y, r, g, b, mouse.y + length]);
      draw.forEach((d) => {
        p5.stroke(d[2], d[3], d[4]);
        p5.line(d[0], d[1], d[0] + d[5] * p5.cos(p5.radians(p5.frameCount)), d[1] + d[5] * p5.sin(p5.radians(p5.frameCount)));
        // if (d[2] !== d[5]) {
        //   drawLine(p5, d[0], d[1], d[2], d[3], d[4], 1);
        //   d[2] += 1;
        // }
      });
      // drawLine(p5, mouse.x, mouse.y, r, g, b, length);
    }
  };

  function drawLine(p5, x, y, r, g, b) {
    p5.strokeWeight(1);
    p5.noFill();
    p5.stroke(r, g, b);
    p5.line(x, y, x, y + length);
    p5.line(x + 4, y + 4, x + 4, y + length + 4);
    p5.line(x - 4, y - 4, x - 4, y + length - 4);
  }
};

new p5(sketch);