import './globals.css'
import Footer from '@/app/(lib)/components/footer'
import Header from '@/app/(lib)/components/header'
import Categories from './(lib)/components/homepage/categories'
import CartComponent from './(lib)/context/cart'


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
          text-center xs:px-5
          max-w-[100%]'>

          <Header/>
          <CartComponent/>
        
          {children}
          <section id='categories'>

            <Categories/>
          </section>

          <Footer/>
        
        </div>
    
      </body>
    </html>
  )
}
