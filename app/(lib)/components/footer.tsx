import DarkMode from "./DarkMode";

export default function Footer(){
    return (
        <footer 
            className='
                min-h-[200px] mt-20 
                flex justify-center items-center
                text-white'> 
            This is a footer, say hello

            <DarkMode/>
        </footer>  

    )
}

