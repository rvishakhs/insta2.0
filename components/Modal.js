import React, { useState, Fragment, useRef } from 'react'
import { Snapshot, useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import { Transition, Dialog } from '@headlessui/react'
import { CameraIcon} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import {db, storage } from "../firebase"
import { collection, serverTimestamp, addDoc,doc,updateDoc } from 'firebase/firestore'
import {ref, uploadString, getDownloadURL } from '@firebase/storage'
import { async } from '@firebase/util'

function Modal() {

    const [open, setOpen ] = useRecoilState(modalState)
    const {data : session} = useSession();
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const uploadPost = async ()=>{
        if (loading) return;
        
        setLoading(true);

        // 1) Create  a post and add firestore "posts" collection.
        // 2) get the post Id from newly added post 
        // 3) upload the image to firebase storage with post ID
        // 4) get a download url from firebase storage and update the orginal post with image

        const docref = await addDoc(collection(db, 'posts'),{
            username : session.user.username,
            caption : captionRef.current.value,
            profilepic : session.user.image,
            Timestamp : serverTimestamp(),
        })
    
        const imgRef = ref(storage, `posts/${docref.id}/image`)

        await uploadString (imgRef, selectedFile, "data_url").then(async Snapshot =>{
            const downloadurl = await getDownloadURL(imgRef)

            await updateDoc(doc(db, 'posts', docref.id),{
                image: downloadurl
            });
        })

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);

    } 


        
  return (

    <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            onClose={setOpen}
        >

        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>       
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

                {/* This element is a trick the browser into centering the modal contents */}
            <span
                className='hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden="true"
            >
                &#8203;
            </span>

            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm: translate-y-0 sm:scale-95"
            >
                <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
                overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full 
                sm:p-6'>
                    <div>
                        {selectedFile ? (
                            <img 
                                src={selectedFile}
                                alt="Image"
                                onClick={() => setSelectedFile(null)}
                                className='w-full object-contain cursor-pointer'
                            />
                        ):(
                            <div 
                        onClick={() => filePickerRef.current.click()}
                        className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'>
                            <CameraIcon 
                                className='h-8 w-8 text-red-600'
                                aria-hidden="true"
                            />
                        </div>
                        )}
                        
                        <div>
                            <div className='mt-3 text-center sm:mt-5'>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg leading-6 font-medium text-gray-900" 
                                >
                                    Upload a photo
                                </Dialog.Title>
                            <div>
                                <input
                                    ref={filePickerRef}
                                    type="file"
                                    hidden
                                    onChange={addImageToPost}
                                />
                            </div>
                                <div className='mt-2'>
                                    <input
                                        className='border-none focus:ring-0 w-full text-center'
                                        type="text"
                                        placeholder='Please enter a caption'
                                        ref={captionRef}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 sm:mt-6'>
                        
                            <button
                                onClick={uploadPost}
                                disabled={!selectedFile}
                                type="button"
                                className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm 
                                px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                                focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                                disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                            >
                                {loading ? "Uploading...": "Upload"}  
                           </button>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal