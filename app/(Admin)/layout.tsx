import { getServerSession } from 'next-auth/next';
import DarkMode from '../(Shared)/DarkMode'
import './globals.css'
import {  ExitGuestComponent, NotLoggedIn, SignOutButton } from '../(Shared)/components/Global';
import Link from 'next/link';
import Footer from '../(User)/(lib)/components/footer';
import { getCookies } from '../(User)/(lib)/api/cookies';
import {ClientItemSearch} from './SearchComponent'

import {Lato} from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  display: 'auto',
  weight: "400"
})


export const metadata = {
  title: 'Admin Panel',
}

export default async function RootLayout(
  {children}: 
  {children: React.ReactNode}
) {
 

  const session =  await getServerSession();
  const guestCookie =  session
    ?null
    :await getCookies()
      .filter(
        cookie=>
          cookie.name=="guestAdmin")[0];

  const guestDisplay = guestCookie?guestCookie.value=="true":null

  

  return (
    <html lang="en">

      <body className={`
      ${lato.className}
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
      items-center`}>

        <header className='
          w-full pb-10 pt-5'>

          <div
            className='
            text-center
            mb-6
            grid grid-cols-2 gap-x-1 
            justify-items-center place-items-center'>
              
              
          {guestDisplay && <p>Viewing in Guest Mode</p>}

          {session
            ?
              <>
              <p className='text-center'>Logged in as {session.user?.name}  </p>    

              <SignOutButton/>    
              </>

            :
            <>
            {!guestDisplay && <p>Not logged in</p>}    

            
              <Link 
                className='
                text-right 
                hover:underline capitalize'
                href="/signin">Log in</Link>
            </>
          
          }

        </div>

        { ( session || guestDisplay ) &&
        <div className='
        bg-opacity-5 bg-black
          dark:bg-opacity-5 dark:bg-white
          py-2 text-lg place-items-center
          xs:text-base
          mt-2 grid grid-cols-4 justify-items-center'>
          <ClientItemSearch/>
          <Link className='hover:underline' href={"/admin/items/1/default"}>Items</Link>
          <Link className='hover:underline' href={"/admin/categories"}>Categories</Link>
          <Link className='hover:underline' href={"/admin/orders"}>Orders</Link>
        </div>
        }

        </header>

          {session 
          || guestDisplay 
          ?children
          :<NotLoggedIn/>
          }

        <Footer>
          You are in the admin view{guestDisplay && <>&nbsp;as guest</>}. 
          <br/>
          {guestDisplay &&
          
          <ExitGuestComponent/>
          // Currently doesn't redirect..
          
          }
          <div className='pt-2'>

            <Link
              className='hover:underline' 
              href={"/"}>Store Page
            </Link>

          </div>

        </Footer>

    
      </body>
    </html>
  )
}
