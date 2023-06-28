'use client'

export const Button=({link}:{link:string})=>(
    <button 
        onClick={()=>{window.open(link)}}
        className="w-full bg-slate-300 h-10 px-2 rounded-md">
                BUY
    </button>

)
              