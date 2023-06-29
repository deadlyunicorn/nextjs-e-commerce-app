import "@/app/(lib)/styles/animations.scss"

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