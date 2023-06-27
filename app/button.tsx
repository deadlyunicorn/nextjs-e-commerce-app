'use client'

export const Button=({link}:{link:string})=>(
    <button 
        onClick={()=>{window.open(link)}}
        className="w-full bg-slate-300 mx-2 p-2 rounded-md">
                BUY
    </button>

)
              