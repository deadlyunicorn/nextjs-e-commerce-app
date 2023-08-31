import './globals.css'
import Footer from '@/app/(User)/(lib)/components/footer'
import Header from '@/app/(User)/(lib)/components/header'
import Categories from './(lib)/components/categories'
import { CookieVerify } from './(lib)/components/cart/Initialize_Cart'
import CartProvider from './(lib)/components/redux/Provider'
import { CartClientWrapper } from './(CartPage)/CartClient'
import CartPage from './(CartPage)/cart/CartPage'
import Banner from './(lib)/components/Banner'

import {Lato} from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  display: 'auto',
  weight: "400"
})


export const metadata = {
  title: 'My Webstore',
  description: 'This is my webstore',
}

export default function RootLayout(
  {children}: 
  {children: React.ReactNode}
  
) {

  return (
    <html lang="en">

      <body className={`
        bg-gradient-to-b
        text-slate-900
        dark:text-slate-200
        from-slate-100
        to-slate-300
        dark:from-slate-900
        from-90%
        dark:to-black
        flex flex-col
        min-h-screen
        justify-between
        items-center ${lato.className}`}>


            <CookieVerify/>

            <CartProvider>

              <Header/>
              <Banner/>
            
              <CartClientWrapper>
                <CartPage/>
              </CartClientWrapper>

              <div className='
                w-full
                mt-[5vh] 
                xl:max-w-4xl 
                md:max-w-3xl
                text-center xs:px-5
                max-w-[100%]'>

                  {children}

                  

              </div>

            </CartProvider>


            

            <Footer>
              <Categories />
            </Footer>
        
      </body>
    </html>
  )
}
