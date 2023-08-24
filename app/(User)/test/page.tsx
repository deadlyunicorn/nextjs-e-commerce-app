"use client"

import { useEffect, useState } from "react";
import ProductLoader from "../product/[permalink]/loading"

const limit = 100;


export default function Test() {


    const [min, setMin] = useState(0);
    const [max, setMax] = useState(80);


    return (
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

            <CustomSlider min={min} setMin={setMin} max={max} setMax={setMax} />

            <br />
            Min:{min}
            <br />
            Max:{max}
        </>
    )
}


const CustomSlider = ({ min, max, setMin, setMax }: { min: number, max: number, setMin: any, setMax: any }) => {

    const [remaining, setRemaining] = useState(0);



    useEffect(() => {
        setRemaining(limit - (limit - max) - min);
    }, [min, max])


    useEffect(() => {
        setPer1(Math.round(100 * min / limit));
        setPer3(Math.round(100 * (limit - max) / limit));
        setPer2(Math.round(100 * remaining / limit));

    }, [min, max, remaining])


    const [per1, setPer1] = useState(0);
    const [per2, setPer2] = useState(0);
    const [per3, setPer3] = useState(0);


    const range1 = document.querySelector('#drag1')?.getBoundingClientRect()
    const range1_left = Math.round(range1?.left! * 100) / 100
    const range1_right = Math.round(range1?.right! * 100) / 100

    const range3 = document.querySelector('#drag3')?.getBoundingClientRect()
    const range3_left = Math.round(range3?.left! * 100) / 100
    const range3_right = Math.round(range3?.right! * 100) / 100

    const range = Math.round((range3_right - range1_left) * 100) / 100;

    useEffect(() => {
        setMax(max - 1)
        //prevents slider position bug?
    }, [])

    useEffect(() => {

        // based on https://www.w3schools.com/howto/howto_js_draggable.asp
        //@ts-ignore
        document.querySelector('#slider1').onmousedown = (e) => {

            document.onmousemove = (e) => {
                if (e.clientX > range1_left && e.clientX < range3_left - 10) {
                    const pos1 = e.clientX - range1_left
                    setMin(Math.round((pos1 / range) * 100))

                }
                else if (e.clientX < range1_left) {
                    // currently div resets after dragging, causing it to bug
                    setMin(0)
                }
                else if (e.clientX > range3_left - 10) {
                    setMin(Math.round(((range3_left - 10 - range1_left) / range) * 100))
                }
            }
            document.onmouseup = () => {
                document.onmousedown = null;
                document.onmousemove = null;
            }

        }

        //@ts-ignore
    
    // document.querySelector('#slider1').ontouchstart = (e) => {

    //     alert('hello');

    //     document.ontouchmove = (e) => {
    //         if (e.clientX > range1_left && e.clientX < range3_left - 10) {
    //             const pos1 = e.clientX - range1_left
    //             setMin(Math.round((pos1 / range) * 100))

    //         }
    //         else if (e.clientX < range1_left) {
    //             // currently div resets after dragging, causing it to bug
    //             setMin(0)
    //         }
    //         else if (e.clientX > range3_left - 10) {
    //             setMin(Math.round(((range3_left - 10 - range1_left) / range) * 100))
    //         }
    //     }
    //     document.ontouchend = () => {
    //         document.ontouchstart = null;
    //         document.ontouchmove = null;
    //     }
    // }

    })

        document.ontouchstart=()=>{
            alert('hii')
        }

    useEffect(() => {
        //@ts-ignore

        document.querySelector('#slider2').onmousedown = (e) => {
            document.onmousemove = (e) => {
                e.preventDefault();
                if (e.clientX > range1_right + 20 && e.clientX < range3_right + 1) {
                    const pos2 = range1_left + range - e.clientX;

                    setMax(Math.round(((range - pos2) / range) * 100))

                }
                else if (e.clientX < range1_right) {
                    // setMax(Math.min(Math.round(((range-range1_right)/range)*100),min+10))
                    // currently div resets after dragging, causing it to bug
                }
                else if (e.clientX > range3_right + 1) {
                    setMax(Math.round(((range) / range) * 100))
                }
            }
            document.onmouseup = () => {
                document.onmousedown = null;
                document.onmousemove = null;
            }

        }
    });




            return (
                <>

                    <div className="min-w-[10rem] max-w-[10rem] h-2 rounded-md flex ">
                        <div
                            id="drag1"
                            style={{ width: `${per1}%` }}
                            className="relative 
                    flex justify-end 
                    shadow-inner shadow-black 
                    rounded-l-md 
                    bg-slate-200 h-full">

                            <div
                                id="slider1"
                                style={{ left: `${Math.round(min * range) / 100}px` }}
                                className="cursor-col-resize 
                            w-3 h-3
                            -translate-x-1
                            -translate-y-[2px]
                            rounded-full bg-gradient-radial from-red-200 to-black shadow-inner shadow-black  absolute"/>


                        </div>
                        <div
                            id="drag2"
                            style={{ width: `${per2}%` }}
                            className="shadow-inner shadow-blue-950
                bg-blue-600 h-full"/>
                        <div
                            id="drag3"
                            style={{ width: `${per3}%` }}
                            className="
                relative
                shadow-inner shadow-black
                rounded-r-md bg-slate-200 h-full">


                            <div
                                id="slider2"
                                style={{ right: `${Math.round(100 * (limit - max) / limit) * range / 100}px` }}
                                className="cursor-col-resize 
                    w-3 h-3
                    translate-x-1
                    -translate-y-[2px]
                    rounded-full bg-gradient-radial from-red-200 to-black shadow-inner shadow-black  absolute"/>

                        </div>

                    </div>

                    <div className="flex flex-col absolute translate-y-4">
                        <div>%1:{per1}</div>
                        <div>%2:{per2}</div>
                        <div>%3:{per3}</div>
                        <hr />
                        Left:{range1_left}
                        <br />Right:{range1_right}
                        <hr />
                        <br />
                        Left:{range3_left}
                        <br />Right:{range3_right}

                        <br />range:{range}



                    </div>
                </>

            )

        }