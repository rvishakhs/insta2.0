import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import Header from '../../components/Header'
import instPic from "../../components/Images/pic1.png"

function signin({providers}) {
  return (
    <>

    <Header />


    <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56  px-14 text-center'>

      <img 
        className='w-120'
        src="https://www.fontmirror.com/app_public/files/t/1/featured_image/2021/05/featured_8736.jpg"
      />

      <p className='text-xs italic'>This is not the real Instagram, this app is built for educational purpose <br></br> <span className='font-semibold text-right ml-0'>build by Visakh</span></p>

     <div>
     {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className='mt-10 p-3 bg-blue-400 rounded-lg text-white' onClick={() => signIn(provider.id, {callbackUrl:'/'})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div> 
    </div>
     
    </>
  )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }

export default signin