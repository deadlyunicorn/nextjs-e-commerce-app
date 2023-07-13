import './globals.css'


export const metadata = {
  title: 'Admin Panel',
}

export default function RootLayout(
  {children}: 
  {children: React.ReactNode}
) {
 
  return (
    <html lang="en">

      <body className="">


                  {children}


    
      </body>
    </html>
  )
}
