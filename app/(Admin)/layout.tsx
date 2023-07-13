import { getServerSession } from 'next-auth/next';
import DarkMode from '../(Shared)/DarkMode'
import './globals.css'
import { LoginButtons, NotLoggedIn, SignOutButton } from './components/Global';


export const metadata = {
  title: 'Admin Panel',
}

export default async function RootLayout(
  {children}: 
  {children: React.ReactNode}
) {
 

  const session = await getServerSession();


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

          {session
          ?<aside>
            Logged in with {session.user?.email}      

            <SignOutButton/>     
          </aside>
          :<LoginButtons/>
          
          }

        </header>

          {session
          ?children
          :<NotLoggedIn/>
          }

        <footer>

          <DarkMode/>

        </footer>

    
      </body>
    </html>
  )
}
