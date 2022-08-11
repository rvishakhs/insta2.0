import React, { useEffect } from 'react'
import { faker } from '@faker-js/faker';
import Suggestion from './Suggestion';

function Suggestions() {

    const [suggestions, setSuggestions] = React.useState([])

    useEffect(() => {

        const USERS = [];

        function createRandomUser() {
            return {
              userId: faker.datatype.uuid(),
              username: faker.internet.userName(),
              email: faker.internet.email(),
              company:faker.company.bsAdjective(),
              avatar: faker.image.avatar(),
              password: faker.internet.password(),
              birthdate: faker.date.birthdate(),
              registeredAt: faker.date.past(),
            };
          }

          Array.from({ length: 6 }).forEach(() => {
            USERS.push(createRandomUser());
          });
          
        setSuggestions(USERS)

    }, [])



  return (
    <div>
        <h2 className='font-semibold text-gray-400 ml-10 m-3'>Suggestions for you</h2>
        {suggestions.map(item =>(
            <Suggestion 
                key={item.userId}
                user={item.username}
                avtar={item.avatar}
                company={item.company}
            />
        ))}
    </div>
  )
}

export default Suggestions