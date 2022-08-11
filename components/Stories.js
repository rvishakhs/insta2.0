import React, { useEffect } from 'react'
import { faker } from '@faker-js/faker';
import Story from './Story';
import {useSession } from 'next-auth/react'

function Stories() {

    const {data : session} = useSession();
    const [suggestions, setSuggestions] = React.useState([])

    useEffect(() => {

        const USERS = [];

        function createRandomUser() {
            return {
              userId: faker.datatype.uuid(),
              username: faker.internet.userName(),
              email: faker.internet.email(),
              avatar: faker.image.avatar(),
              password: faker.internet.password(),
              birthdate: faker.date.birthdate(),
              registeredAt: faker.date.past(),
            };
          }

          Array.from({ length: 20 }).forEach(() => {
            USERS.push(createRandomUser());
          });
          
        setSuggestions(USERS)

    }, [])


    
  return (
    <div className='flex space-x-6 p-6 mt-5 border-gray-200 border rounded-sm bg-white overflow-x-scroll scrollbar-thin scrollbar-thumb-black '>
       
       {session && (
        <Story 
          img={session?.user?.image}
          user={session?.user?.username}
        />
       )}
       
        {suggestions.map(profile =>(
            <Story 
                key={profile.userId}
                img={profile.avatar}
                user={profile.username}
            />
        ))}
    </div>
  )
}

export default Stories