import React from 'react'
import Image from "next/image"
import instPic from "../components/Images/pic1.png"
import instPic2 from "../components/Images/pic2.png"
import {  SearchIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon, UserGroupIcon, HeartIcon} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import {modalState} from "../atoms/modalAtoms"




function Header() {

    const {data : session} = useSession();
    const [open, setopen] = useRecoilState(modalState)
     const router = useRouter();

  return (
    <div className='shadow-sm border-b bg-white sticky top-0 z-50'> 

        <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto '>
            {/* Left */}
            <div className='relative hidden cursor-pointer lg:inline-grid  w-24 ml-2'>
                <Image 
                    src={instPic}
                    layout="fill"
                    objectFit='contain'
                    onClick={() => router.push('/')}
                />

            </div>

            <div className='relative flex-shrink-0 cursor-pointer lg:hidden  w-8  '>
                <Image 
                    src={instPic2}
                    layout="fill"
                    objectFit='contain'
                    onClick={() => router.push('/')}
                />

            </div>
            

            {/* Midile for search box */}

            <div className='max-w-xs '>
                <div className=' relative m-2 pl-3 rounded-md '>
                    <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-gray-500'/>
                    </div>
                        <input 
                            className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:border-black focus:ring-black '
                            type="text"
                            placeholder='Search'
                        />
                </div>

            </div>
            

            {/* Right */}

            <div className='flex items-center justify-end space-x-4'>
                 <HomeIcon onClick={() => router.push('/')} className='navbtn'/>
                 <MenuIcon className=' h-7 w-7 md:hidden cursor-pointer' />

                 {session? (
                     <>
                        <div className='relative navbtn'>
                         <PaperAirplaneIcon className='navbtn rotate-45'/>
                        <div className='absolute -top-1 -right-1 text-xs w-5 h-5 text-white bg-red-600 rounded-full flex items-center justify-center animate-pulse' >
                            3
                        </div>
                    </div>
                    <PlusCircleIcon onClick={() => setopen(true)} className='h-7 w-7 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-in-out'/>
                    <UserGroupIcon className='navbtn'/>
                    <HeartIcon className='navbtn'/>

                    <img
                        onClick={signOut}
                        src={session?.user?.image}
                        alt=""
                        className=' h-9 w-9 rounded-full cursor-pointer'
                        />
                    </>  

                 ) : (

                    <button className='font-semibold' onClick={signIn}>SignIn</button>

                 )}
                
            </div>
            
            </div>
        
    </div>
  )
}

export default Header