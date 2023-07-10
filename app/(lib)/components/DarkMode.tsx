'use client'

import '@/app/(lib)/styles/animations.scss'
import { useEffect, useState } from "react"

const DarkMode = () => {


    const localDark = localStorage.theme == 'dark'

    const [buttonClicked,setButtonClicked] = useState(localDark);

    useEffect(()=>{

        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        

        if (
            localStorage.theme === 'dark' 
            || ( !('theme' in localStorage) && systemDark)
        ) {
                    
            document.documentElement.classList.add('dark');

            document.querySelector('#dark-mode-button')?.classList.remove('leftPosAnimation');
            document.querySelector('#dark-mode-button')?.classList.add('rightPosAnimation');

                
        } 

        else 
        {
            document.documentElement.classList.remove('dark');
            

            document.querySelector('#dark-mode-button')?.classList.remove('rightPosAnimation');
            document.querySelector('#dark-mode-button')?.classList.add('leftPosAnimation');

        }

    });

    return (
        <button 
            onClick={()=>{
                if (
                    localStorage.theme === 'dark'
                ){
                    localStorage.theme = 'light';
                }
                else{
                    localStorage.theme = 'dark';
                }
                setButtonClicked(!buttonClicked)                
            }}
            className="
                px-1 py-1 relative
                bg-white rounded-md
                w-12 h-7 flex items-center">


                    <div 
                    id='dark-mode-button'
                    className="
                    dark:bg-blue-900
                    bg-yellow-400
                        absolute 
                        h-5 w-5 
                        rounded-md 
                        "/>
                        <br/>
                        <br/>
        </button>
    )
}

export default DarkMode;