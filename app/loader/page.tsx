import '@/app/(lib)/animations.scss'

export default function LoadingScreen(){
    return(
        <div className="
          flex flex-wrap
          justify-center items-center   
          gap-20 min-h-[400px]
          animation-loader
          ">

            <div className="h-2 w-2 bg-white rounded-md"/>
            <div className="h-2 w-2 bg-white rounded-md"/>
            <div className="h-2 w-2 bg-white rounded-md"/>  

        </div>
    )
}