import "@/app/(User)/(lib)/styles/animations.scss"

export default function LoadingScreen(){
    
    const Dot = ()=>(
        <div className="
            h-2 w-2 
            bg-white 
            rounded-md 
            drop-shadow-[0px_0px_4px_rgba(100,100,200,1)]"/>
    )
    
    return(
        <div className="
          flex flex-wrap
          justify-center items-center   
          gap-20 min-h-[400px]
          animation-loader
          ">

            <Dot/>
            <Dot/>
            <Dot/>
        </div>
    )
}

//In case you need to fullscreen the loader in the future
//add those classes:

/*
   bg-gradient-to-b
        text-slate-900
        
        dark:text-slate-200
        from-slate-100
        to-slate-300
        dark:from-slate-900
        from-90%
        dark:to-black
            fixed left-0 bottom-0
            w-full h-full
*/