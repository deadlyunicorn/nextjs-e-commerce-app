import { getServerSession } from 'next-auth/next';
import DarkMode from '@/app/(Shared)/DarkMode'
import './globals.css'
import Link from 'next/link';


export const metadata = {
  title: 'Authentication',
}

export default async function RootLayout(
  {children}: 
  {children: React.ReactNode}
) {
 

  const session = await getServerSession();


  return (
    <html lang="en">

      <body className="
      min-h-screen
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


        </header>

          {session
          ? <main className='flex flex-col items-center justify-center'> 
              <p>You are already signed in</p>
              <Link href="/" className='hover:underline'>Homepage</Link> 
            </main>
          : children
          }

        <footer>

          <DarkMode/>

        </footer>

    
      </body>
    </html>
  )
}
