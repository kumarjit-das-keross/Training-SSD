"use client";
import * as React from "react";
import Selecto from "react-selecto";
import Moveable from "react-moveable";
import './moveable.css';
import chartOptions from "@/app/db/chartOptions.json";



export default function MoveableAndSelecto({children}) {
    const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>([]);
    const moveableRef = React.useRef<Moveable>(null);
    const selectoRef = React.useRef<Selecto>(null);
    const cubes = [];
    const horizontalBarChartOption = chartOptions.horizontalBarChartOption;



    return <div className="root h-full w-full">
        <div className=" h-full w-full">
            <Moveable
                ref={moveableRef}
                draggable={true}
                target={targets}
                onClickGroup={e => {
                    selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onDragGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }}
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

            ></Moveable>
            <Selecto
                ref={selectoRef}
                dragContainer={window}
                selectableTargets={[".selecto-area .cube ",".hi"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    if (
                        moveable.isMoveableElement(target)
                        || targets.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={e => {
                    const moveable = moveableRef.current!;
                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();

                        moveable.waitToChangeTarget().then(() => {
                            moveable.dragStart(e.inputEvent);
                        });
                    }
                    setTargets(e.selected);
                }}
            ></Selecto>
            <div className="h-full w-full">
                {children}
            </div>

            {/* <div className="elements selecto-area">
             
                <div className="hi" style={{"height": "250px","width": "300px"}}>
                <ECharts  option={horizontalBarChartOption} />
                </div>
                <div className="hi" style={{"height": "250px","width": "300px"}}>
                <ECharts  option={horizontalBarChartOption} />
                </div>
      

            </div> */}
            <div className="empty elements"></div>
        </div>
    </div>;
}
