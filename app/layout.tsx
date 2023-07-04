import './globals.css'
import Footer from '@/app/(lib)/components/footer'
import Header from '@/app/(lib)/components/header'
import Categories from './(lib)/components/homepage/categories'
import { CookieVerify } from './(lib)/components/cart/Initialize_Cart'
import CartProvider from './(lib)/components/redux/Provider'


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

      <body className="
        bg-stone-900
        flex flex-col
        items-center mt-5">

        <div className='
          xl:max-w-4xl 
          md:max-w-3xl
          text-center xs:px-5
          max-w-[100%]'>

            <CartProvider>
              <Header/>
            
              <CookieVerify/>
            
              {children}

            </CartProvider>


            <section id='categories'>

              <Categories/>
            </section>

            <Footer/>
        
        </div>
    
      </body>
    </html>
  )
}
