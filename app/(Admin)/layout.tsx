import DarkMode from '../(Shared)/DarkMode'
import './globals.css'


export const metadata = {
  title: 'Admin Panel',
}

export default function RootLayout(
  {children}: 
  {children: React.ReactNode}
) {
 
  return (
    <html lang="en">

      <body className="
      bg-gradient-to-b
      text-slate-900
      
      dark:text-slate-200
      from-slate-100
      to-slate-300
      dark:from-slate-900
      from-90%
      dark:to-black
      flex flex-col
      items-center mt-5">

        <header>

          What a great day

        </header>

                  {children}

        <footer>

          <DarkMode/>

        </footer>

    
      </body>
    </html>
  )
}
