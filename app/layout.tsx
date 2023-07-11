import './globals.css'
import Footer from '@/app/(lib)/components/footer'
import Header from '@/app/(lib)/components/header'
import Categories from './(lib)/components/homepage/categories'
import { CookieVerify } from './(lib)/components/cart/Initialize_Cart'
import CartProvider from './(lib)/components/redux/Provider'
import { CartClientWrapper } from './(CartPage)/CartClient'
import CartPage from './(CartPage)/cart/CartPage'
import { getCookie } from './(lib)/api/cookies'


export const metadata = {
  title: 'My Webstore',
  description: 'This is my webstore',
}

export default async function RootLayout(
  {children}: 
  {children: React.ReactNode}
) {

  const darkThemeCookie = await getCookie('darkMode');


  console.log(darkThemeCookie);

  return (
    <html lang="en" className={darkThemeCookie}>

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

            {/* light mode */}
        {/* // from-slate-100 */}
        {/* // to-violet-300 */}

        <div className='
          xl:max-w-4xl 
          md:max-w-3xl
          text-center xs:px-5
          max-w-[100%]'>

            <CartProvider>
              {/* provider not needed? */}
              <Header/>
            
              <CookieVerify/>
            
              <CartClientWrapper>
                <CartPage/>
              </CartClientWrapper>
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
