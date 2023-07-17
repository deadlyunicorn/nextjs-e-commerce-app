import { getServerSession } from 'next-auth/next';
import DarkMode from '../(Shared)/DarkMode'
import './globals.css'
import { NotLoggedIn, SignOutButton } from '../(Shared)/components/Global';
import Link from 'next/link';
import Footer from '../(User)/(lib)/components/footer';


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
      min-h-screen
      bg-gradient-to-b
      text-slate-900
      
      dark:text-slate-200
      from-slate-100
      to-slate-300
      dark:from-slate-900
      from-90%
      dark:to-black

      flex flex-col justify-between
      items-center">

        <header className='
          w-full py-10 
            
          flex gap-x-1 
          justify-around items-center'>
          {session
          ?
            <>
            <p>Logged in as {session.user?.name}  </p>    

            <SignOutButton/>    
            </>

          :
          <>
          <p>Not logged in</p>    

          
            <Link 
              className='hover:underline capitalize'
              href="/signin">Log in</Link>
          </>
          
         }

        </header>

          {session
          ?children
          :<NotLoggedIn/>
          }

        <Footer>
          You are in the admin view.
          <br/>
          <Link
            className='hover:underline' 
            href={"/"}>Store Page</Link>
        </Footer>

    
      </body>
    </html>
  )
}
