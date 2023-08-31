"use client"
import { useEffect, useState } from "react";


const limit = 500;
const minimumProductPrice = null || 1
const maximumProductPrice = limit;

export default function Doubleslider() {


    const [min, setMin] = useState(minimumProductPrice);
    const [max, setMax] = useState(limit);


    return (
        <>

            <DefaultSliders max={max} min={min} setMax={setMax} setMin={setMin} />

            <CustomSlider min={min} setMin={setMin} max={max} setMax={setMax} />

            <br />
            Min:{min}
            <br />
            Max:{max}
        </>
    )
}

//@ts-ignore
const DefaultSliders = ({ min, max, setMin, setMax }) => (

    <>

        <input
            type="range" min={0} max={limit}
            value={max}
            className="
                    absolute   
                    appearance-none 
                    shadow-black shadow-inner
                    text-blue-500 bg-left rounded-lg h-2"

            onChange={(e) => {
                const newValue = +e.target.value;
                if (newValue > min + 5) {
                    setMax(newValue)
                }
            }} />
        <input
            value={min}
            className="
                -translate-y-10
                absolute hover:z-10  appearance-none shadow-black  shadow-inner text-blue-500 bg-left rounded-lg h-2 "

            onChange={(e) => {
                const newValue = +e.target.value;

                if (newValue < max - 5) {
                    setMin(newValue)
                }

            }}
            type="range" min={0} max={limit} />

    </>

)


const CustomSlider = ({ min, max, setMin, setMax }: { min: number, max: number, setMin: any, setMax: any }) => {




    //the slider is divided in 3 ranges
    //
    //      r1   r2    r3
    // !  [////|/////|////]
    ///   l   r l   r l   r
    //


    const [range1, setRange1] = useState<DOMRect | undefined>(undefined);
    const [range3, setRange3] = useState<DOMRect | undefined>(undefined);

    useEffect(() => {

        if (document.querySelector('#drag1')) {
            setRange1(document.querySelector('#drag1')?.getBoundingClientRect())
        }
        if (document.querySelector('#drag3')) {
            setRange3(document.querySelector('#drag3')?.getBoundingClientRect());
        }

    })

    let range = 1;

    if (range3 && range1) {
        range = (range3.right - range1.left) || 1;

    }




    const handleMouseDownS1 = () => {

        document.onmousemove = (e) => {
            sliderLogic_1(e)
        }

        document.onmouseup = () => {
            document.onmousedown = null;
            document.onmousemove = null;
        }
    }

    const handleTouchStartS1 = () => {
        document.ontouchmove = (evt) => {
            const e = evt.changedTouches[0];
            sliderLogic_1(e);
        }
        document.ontouchend = () => {
            document.ontouchstart = null;
            document.ontouchmove = null;
        }
    }

    const handleMouseDownS2 = () => {

        document.onmousemove = (e) => {
            sliderLogic_2(e)
        }

        document.onmouseup = () => {
            document.onmousedown = null;
            document.onmousemove = null;
        }
    }

    const handleTouchStartS2 = () => {
        document.ontouchmove = (evt) => {
            const e = evt.changedTouches[0];
            sliderLogic_2(e);
        }
        document.ontouchend = () => {
            document.ontouchstart = null;
            document.ontouchmove = null;
        }
    }


    const minimalSpace = 0.05 * (range || 100);
    const positionCorrection = range1 ? range1.left : 0;
    const scaleCorrection = limit / (range || 1);

    const sliderLogic_1 = (e: any) => {

        const mousePositionX = e.clientX;

        if (range1 && range3) {


            //slider1 pos. must be larger than range1_right
            //     r1   r2   r3
            // ! [////|////|////] 
            //       s1    s2

            //      if the mouse is within the slider and left from slider2 

            if (mousePositionX > range1.left && mousePositionX < range3.left - minimalSpace) {


                //mouse position from the edge of the screen
                //minus position of range 1's left from the edge of the screen

                const newPos = mousePositionX - positionCorrection;

                setMin(newPos * scaleCorrection)

            }


            else if (mousePositionX < range1.left) {

                setMin(minimumProductPrice);

            }

            else if (mousePositionX > range3.left - minimalSpace) {

                const newPos = (range3.left - minimalSpace) - positionCorrection;
                setMin(newPos * scaleCorrection)

            }
        }
    }

    const sliderLogic_2 = (e: any) => {

        const mousePositionX = e.clientX;

        if (range1 && range3) {

            if (mousePositionX > range1.right + minimalSpace && mousePositionX < range3.right) {

                const newPos = mousePositionX - positionCorrection;
                setMax(newPos * scaleCorrection)

            }
            else if (mousePositionX < range1.right + minimalSpace) {

                const newPos = range1.right + minimalSpace - positionCorrection;
                setMax(newPos * scaleCorrection)
            }
            else if (mousePositionX > range3.right) {

                setMax(limit)

            }
        }

    }


    return (
        <>


            <div className="min-w-[10rem] max-w-[10rem] h-2 rounded-md flex relative">
                <div
                    id="drag1"
                    style={{ width: `${100 * min / limit}%` }}
                    className="
                    relative 
                    flex justify-end 
                    shadow-inner shadow-black 
                    rounded-md
                    bg-inherit h-full"> 

                    <div
                        onMouseDown={handleMouseDownS1}
                        onTouchStart={handleTouchStartS1}
                        id="slider1"
                        style={{ left: `${min * range / limit} }px`}}
                        className="
                        cursor-col-resize 
                        z-10
                        w-3 h-3
                        translate-x-1
                        -translate-y-[2px]
                        rounded-full 
                        bg-gradient-radial from-red-200 to-black shadow-inner shadow-black  absolute"/>


                </div>
                <div
                    id="drag2"
                    style={{ width: `${100 * (max - min) / limit}%` }}
                    className="shadow-inner shadow-blue-950
                bg-blue-600 h-full"/>
                <div
                    id="drag3"
                    style={{ width: `${100 * (limit - max) / limit}%` }}
                    className="
                relative
                shadow-inner shadow-black
                rounded-r-md bg-slate-200 h-full">


                    <div
                        id="slider2"
                        onTouchStart={handleTouchStartS2}
                        onMouseDown={handleMouseDownS2}
                        style={{ right: `${ (limit - max) / limit * range}px` }}
                        className="cursor-col-resize 
                        z-10
                        w-3 h-3
                        translate-x-1
                        -translate-y-[2px]
                        rounded-full bg-gradient-radial from-red-200 to-black shadow-inner shadow-black  absolute"/>

                </div>

            </div>


            {(range1 && range3) &&
                <div className="flex flex-col absolute translate-y-4">

                    <div className="grid grid-cols-2">
                        <span className="col-span-2">R1</span>
                        <span>Left:{Math.round(range1.left * 100) / 100}</span>
                        <span>Right:{Math.round(range1.right * 100) / 100}</span>

                    </div>

                    <div className="grid grid-cols-2">
                        <span className="col-span-2">R3</span>
                        <span>Left:{Math.round(range3.left * 100) / 100}</span>
                        <span>Right:{Math.round(range3.right * 100) / 100}</span>

                    </div>
                    TOTAL
                    <br />range:{range}

                </div>

            }




        </>

    )

}