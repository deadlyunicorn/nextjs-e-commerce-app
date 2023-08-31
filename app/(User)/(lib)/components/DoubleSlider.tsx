"use client"
import { useEffect, useState } from "react";



export const CustomSlider = ({ priceLimit, minimumProductPrice, prevMin, prevMax }: { priceLimit: number, minimumProductPrice: number,prevMin:number,prevMax:number }) => {


    const [min, setMin] = useState(prevMin);
    const [max, setMax] = useState(prevMax);

    //the slider is divided in 3 ranges
    //
    //      r1   r2    r3
    // !  [////|/////|////]
    ///   l   r l   r l   r
    //


    const [range1, setRange1] = useState<DOMRect | undefined>(undefined);
    const [range3, setRange3] = useState<DOMRect | undefined>(undefined);

    useEffect(() => {

        if (document.querySelector('#range1')) {
            setRange1(document.querySelector('#range1')?.getBoundingClientRect())
        }
        if (document.querySelector('#range3')) {
            setRange3(document.querySelector('#range3')?.getBoundingClientRect());
        }

    },[])

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
    const scaleCorrection = priceLimit / (range || 1);

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

                setMax(priceLimit)

            }
        }

    }

    const minPriceDifference = 0.05 * priceLimit;

    return (

        <>
            <div className="flex justify-between w-40">
                <input
                    className="w-16 rangeInput"
                    onChange={(e) => {
                        const newValue = +e.target.value;
                        if (newValue > minimumProductPrice && newValue + minPriceDifference < max) {
                            setMin(newValue)
                        }
                    }
                    }
                    type="number" name="min" value={Math.floor(min)} />
                <input
                    onChange={(e) => {
                        const newValue = +e.target.value;
                        if (newValue <= priceLimit && newValue - minPriceDifference > min) {
                            setMax(newValue)
                        }
                    }
                    }
                    className="w-16 rangeInput"
                    type="number" name="max" value={Math.ceil(max)} />
            </div>

            <div
                className="
                w-40 h-2 rounded-md flex relative">


                <div
                    id="range1"
                    style={{ width: `${100 * min / priceLimit}%` }}

                    className="
                    flex justify-end
                    shadow-inner shadow-black 
                    rounded-md
                    bg-white h-full">

                    <div
                        className="
                        translate-x-1
                        -translate-y-1
                        absolute
                        z-10"

                        id="slider1"

                        onMouseDown={handleMouseDownS1}
                        onTouchStart={handleTouchStartS1}


                        style={{ left: `${min * range / priceLimit} }px` }}>

                        <Slider />

                    </div>

                </div>

                <div
                    id="range2"
                    style={{ width: `${100 * (max - min) / priceLimit}%` }}
                    className=" bg-blue-600 h-full" />

                <div
                    id="range3"
                    style={{ width: `${100 * (priceLimit - max) / priceLimit}%` }}
                    className="
                    shadow-inner shadow-black
                    rounded-r-md bg-white h-full">

                    <div
                        className="w-3 h-3
                        z-10
                        translate-x-1
                        -translate-y-1
                        absolute"

                        id="slider2"

                        onTouchStart={handleTouchStartS2}
                        onMouseDown={handleMouseDownS2}

                        style={{ right: `${(priceLimit - max) / priceLimit * range}px` }}>

                        <Slider />

                    </div>


                </div>

            </div>
        </>


    )

}

const Slider = () => (
    <div

        className="
        cursor-col-resize 
        w-4 h-4
        rounded-full
        bg-blue-800
        shadow-blue-400
        shadow-inner
    "/>
)
