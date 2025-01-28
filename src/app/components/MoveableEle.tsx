"use client";

import * as React from "react";
import Moveable from "react-moveable";
import chartOptions from "@/app/db/chartOptions.json";
import ECharts from "@/app/components/ECharts";



export default function MoveableEle() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const horizontalBarChartOption = chartOptions.horizontalBarChartOption;


  React.useEffect(() => {
    const element = document.getElementById("hi");
    if (element) {
      targetRef.current = element as HTMLDivElement;
      console.log(targetRef.current); // Logs the div element
    }
  }, []);

  return (
    <div className="root h-full w-full">
      <div className="container h-full w-full">
        <div ref={targetRef} className="h-1/2 w-1/2 ">
        <ECharts option={horizontalBarChartOption} />
        <ECharts option={horizontalBarChartOption} />

          {/* <img
            src="https://helder.design/wp-content/uploads/2023/09/Logo.svg"
            className="target"
          ></img> */}
        </div>
        {/* 
                <div className="target" ref={targetRef} style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target</div> */}
        <Moveable
          target={targetRef}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          scalable={true}
          keepRatio={false}
          throttleScale={0}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          rotatable={true}
          throttleRotate={0}
          rotationPosition={"top"}
          originDraggable={true}
          originRelative={true}
          onDragOrigin={(e) => {
            e.target.style.transformOrigin = e.transformOrigin;
          }}
          onRender={(e) => {
            e.target.style.transform = e.transform;
          }}
        />
      </div>
    </div>
  );
}
