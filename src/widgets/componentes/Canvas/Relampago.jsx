import React, { useEffect, useRef } from "react";

const Relampago = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cw = (canvas.width = window.innerWidth * 0.4);
    const ch = (canvas.height = window.innerHeight);
    const ctx = canvas.getContext("2d");

    const rand = (rMi, rMa) => ~~(Math.random() * (rMa - rMi + 1) + rMi);
    const lightning = [];
    let lightTimeCurrent = 0;
    let lightTimeTotal = 100;

    const createL = (x, y, canSpawn) => {
      lightning.push({
        x,
        y,
        xRange: rand(5, 30),
        yRange: rand(5, 25),
        path: [{ x, y }],
        pathLimit: rand(10, 35),
        canSpawn,
        hasFired: false,
      });
    };

    const updateL = () => {
      let i = lightning.length;
      while (i--) {
        const light = lightning[i];
        light.path.push({
          x: light.path[light.path.length - 1].x + (rand(0, light.xRange) - light.xRange / 2),
          y: light.path[light.path.length - 1].y + rand(0, light.yRange),
        });
        if (light.path.length > light.pathLimit) {
          lightning.splice(i, 1);
        }
        light.hasFired = true;
      }
    };

    const renderL = () => {
        let i = lightning.length;
        while (i--) {
          const light = lightning[i];
          
          // Cambiamos el grosor de los rayos
          ctx.strokeStyle = `hsla(0, 0%, 55%, ${rand(10, 100) / 100})`;
          ctx.lineWidth = rand(4, 10); // Ahora las líneas serán más gruesas entre 4 y 10
          
          // Puedes incrementar esta variabilidad para líneas aún más gruesas en ciertos momentos
          if (rand(0, 30) === 0) {
            ctx.lineWidth = rand(10, 15); // Líneas aún más anchas aleatoriamente
          }
          
          ctx.beginPath();
          ctx.moveTo(light.x, light.y);
          light.path.forEach((p) => ctx.lineTo(p.x, p.y));
          ctx.stroke();
        }
      };
      
    const lightningTimer = () => {
      lightTimeCurrent++;
      if (lightTimeCurrent >= lightTimeTotal) {
        const newX = rand(100, cw - 100);
        const newY = rand(0, ch / 2);
        let createCount = rand(1, 3);
        while (createCount--) {
          createL(newX, newY, true);
        }
        lightTimeCurrent = 0;
        lightTimeTotal = rand(30, 100);
      }
    };

    const clearCanvas = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(01, 253, 148, ${rand(1, 30) / 100})`;
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = () => {
      requestAnimationFrame(loop);
      clearCanvas();
      updateL();
      lightningTimer();
      renderL();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);

    loop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} id="Rayos" style={{ display: "block" }} />;
};

export default Relampago;
