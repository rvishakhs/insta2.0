import { collection, onSnapshot, orderBy, query, Timestamp } from '@firebase/firestore'
import React, { useState, useEffect } from 'react'
import { app } from '../firebase.js'
import {getFirestore} from "@firebase/firestore";
import Post from './Post'
import { getApps } from 'firebase/app';


function Posts() {

    const [post, setposts] =  useState([])
    const db = getFirestore(app)

    
    useEffect(
        () => 
            onSnapshot(
                query(collection(db, "posts"), orderBy("Timestamp", 'desc')),
                (snapshot) =>{
                    setposts(snapshot.docs);
                }
            ),
        [db]
    );


  return (
    <div>
        {post.map((item) => (
            <Post 
                key={item.data.id}
                id={item.id}
                user={item.data().username}
                avtar={item.data().profilepic}
                img={item.data().image}
                caption={item.data().caption} 
            />
        ))}

    </div>
  )
}

export default Posts