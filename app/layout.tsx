import '../styles/globals.css'
import {Header} from "@/components/header/Header"
import PromptInput from "../components/promptInput/PromptInput";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
     
        <Header/>
        <PromptInput/>
        {children}
        
        </body>
    </html>
  )
}