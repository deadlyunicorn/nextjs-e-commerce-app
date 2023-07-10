'use client'

import '@/app/(lib)/styles/animations.scss'
import { useEffect, useState } from "react"

const DarkMode = () => {

    const [darkMode,setDarkMode] = useState (false);

    useEffect(()=>{
        if(darkMode){
            localStorage.theme = 'dark'
                
            document.querySelector('#dark-mode-button')?.classList.remove('leftPosAnimation')
            document.querySelector('#dark-mode-button')?.classList.add('rightPosAnimation')

        }
        else{
            localStorage.theme = 'light'
            
            document.querySelector('#dark-mode-button')?.classList.remove('rightPosAnimation')
            document.querySelector('#dark-mode-button')?.classList.add('leftPosAnimation')

        }
    
        if (
            localStorage.theme === 'dark' 
            || ( 
                !('theme' in localStorage) 
                && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
           
                    document.documentElement.classList.add('dark')
                
                } 
        else {
            document.documentElement.classList.remove('dark')
        }
 
    },[darkMode])

    return (
        <button 
            onClick={()=>{
                setDarkMode(!darkMode)
            }}
            className="
                px-1 py-1 relative
                bg-white rounded-md
                w-12 h-7 flex items-center">


                    <div 
                    id='dark-mode-button'
                    data-darkMode={darkMode}
                    className="
 
                    data-[darkMode=true]:bg-red-900
                    data-[darkMode=false]:bg-blue-900
                        absolute 
                        h-5 w-5 
                        rounded-md 
                        "/>
                        <br/>
                        <br/>
                        {darkMode+"aa"}
        </button>
    )
}

export default DarkMode;