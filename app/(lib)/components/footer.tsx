import DarkMode from "./DarkMode";

export default function Footer(){
    return (
        <footer 
            className='
                min-h-[200px] mt-20 
                flex flex-col 
                justify-center items-center'> 

            <div>
                This is a footer, say hello
            </div>

            <div className="flex gap-x-2">
                Toggle Dark Mode : <DarkMode/>
            </div>
        </footer>  

    )
}

