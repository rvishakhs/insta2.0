import React, { useEffect, useState } from 'react'
import {HeartIcon, ChatIcon, BookmarkIcon, PaperAirplaneIcon, EmojiHappyIcon} from '@heroicons/react/outline'
import { DotsHorizontalIcon, HeartIconfiled} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import Moment from 'react-moment';
import { app } from '../firebase';


function Post({id, user, avtar, img, caption}) {
    const {data : session} = useSession();
    const db = getFirestore(app)
    const [comment, setcomment] = useState("")
    const [comments, setcomments] = useState([])
    const [likes, setlikes] = useState([])
    const [hasliked, sethasliked] =useState(false)

    useEffect(
        ()=> 
        onSnapshot(
            query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            ), 
            (snapshot) => setcomments(snapshot.docs)
            ),
        [db, id] 
    );

    useEffect (
        ()=>
            onSnapshot( 
                    collection(db, "posts", id, "likes")
                , (snapshot) => setlikes (snapshot.docs)
            ),
        [db, id]
    );

    useEffect (
        () =>
        sethasliked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        ),
    [likes]);


    
    const likebtn = async(e) => {
        const docRef= doc(db, "posts", id, "likes", session.user.uid)
        if(hasliked){
            await deleteDoc(docRef);
        } else {
            await setDoc(docRef, {username: session.user.username});            
        }
    };

    console.log(hasliked);
    const sendpost = async(e) => {
            e.preventDefault();
            const commenttosend = comment
            setcomment('')

            await addDoc(collection(db, "posts", id , "comments"),{
                comment:commenttosend,
                username:session.user.username,
                userimg: session.user.image,
                timestamp: serverTimestamp(),
            });

    };

  return (
    <div className='border rounded-md my-7'>
    {/* // Header */}
    <div className='flex items-center border-gray-100 p-4'>
        <img 
            src={avtar}
            className="rounded-full object-contain border p-1 h-10 w-10 mr-2"
        />
        <p className='flex-1 font-bold'>{user}</p>
        <DotsHorizontalIcon className='h-5 w-5' />
    </div>

    {/* // img */}

    <img   
        src={img}
        alt="Post image"
        className='object-cover w-full'
    />
    {session && (
        <div className='flex justify-between px-4 py-4'>
        <div className='flex space-x-4'>
            {hasliked ? (
                <HeartIcon onClick={likebtn}className='btn text-red-500'/>
                // <HeartIconfiled onClick={likebtn} className='bg-red-600'/>
            ) : (
                <HeartIcon onClick={likebtn}className='btn'/>
            )}

            <ChatIcon className='btn'/>
            <PaperAirplaneIcon className='btn rotate-45 '/>
        </div>
        <BookmarkIcon className='btn'/>
    </div>
    )}
    {/* // Buttons */}
    


    {/* // Caption */}

    <p className='truncate pl-4 p-1'> 
        {likes.length > 0 && (
            <p className='font-bold text-sm'>{likes.length} like</p>
        )}
        <span className='font-bold mr-2'>{user}</span> {caption}
    </p>
    {/* Comment box */}

    {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
            {comments.map((comment) =>(
                <div key={comment.id} className="flex items-center space-x-2 mb-3">
                    <img 
                        src={comment.data().userimg}
                        alt=""
                        className='w-7 h-7 rounded-full '
                    />
                    <h4 className='text-sm flex-1'><span className='font-semibold'>{comment.data().username} : </span>{comment.data().comment}</h4>

                    <Moment className='pr-5 text-xs text-gray-500'interval={1000} fromNow>
                        {comment.data().timestamp?.toDate()}
                    </Moment>
                </div>
            ))}
        </div>
    )}
    {/* // Comments  */}

    {session && (
        <form className='flex items-center p-2'>
        < EmojiHappyIcon className='h-7 w-7'/>
        <input 
            type="text"
            value={comment}
            placeholder='Add a comment...'
            onChange={(e) => setcomment(e.target.value)}
            className='border-none flex-1 focus:ring outline-none' 
        />
        <button 
            className='mr-2 font-semibold text-blue-500 '
            onClick={sendpost}
            disabled={!comment.trim()}
        >Post</button>
    </form>
    )}

    

    </div>
  )
}

export default Post

