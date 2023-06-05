import Header from '@/components/Header'
import Footer from '@/components/Footer/index'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserContextProvider, useUserContext } from '@/Contexts/UserContext'



const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  return (
    <UserContextProvider>
        <html lang="en">
      <body className={inter.className}>
        <Header/>
        <main>{children}</main>
        <Footer/>
        </body>
      </html>
    </UserContextProvider>
     
   
  )
}
