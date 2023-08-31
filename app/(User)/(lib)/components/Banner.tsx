import '@/app/(User)/(lib)/styles/animations.scss'


import { Play, Tajawal} from 'next/font/google'

const anton = Play({
  subsets: ['latin'],
  display: 'auto',
  weight: "400"
})


const Banner = () => (
    <aside className={`
                ${anton.className}
                
                bg-black
                mt-[min(20vh,70px)]
                w-full overflow-hidden
                z-0
                h-7`}>
                  <div
                    className='
                    w-fit
                    animation-textScroll
                    bg-clip-text
                    bg-gradient-to-t
                    from-red-500
                    to-yellow-400
                    text-transparent
                    h-6 whitespace-nowrap
                    overflow-visible
                    '>
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022; 
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS &#x2022;
                    LIMITED TIME SUMMER OFFERS
                  </div>

              </aside>
)

export default Banner;