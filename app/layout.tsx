import './globals.css'
import Footer from '@/app/(lib)/components/footer'
import Header from '@/app/(lib)/header'
import Categories from './(lib)/components/homepage/categories'


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

      <body className="bg-stone-900  flex flex-col items-center mt-5 ">
        
        <div className='md:max-w-3xl text-center max-w-xl'>

          <Header/>
        
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
