import tw from 'tailwind-styled-components'
import { useEffect, useState } from 'react'

const Wrapper = tw.div`
  bg-blue-800 h-full
  flex justify-center items-center
`

const Deck = tw.div`
  flex flex-col justify-center items-center
`

const Card = tw.div`
  max-w-sm
  min-h-60
  w-11/12
  bg-blue-600
  rounded-lg
  shadow-xl
`

const Profile = tw.img`
  w-24 h-24 bg-white rounded-full
  absolute inset-x-1/2
  transform -translate-x-1/2 -translate-y-1/2
`

const Details = tw.div`
  mt-16 text-white px-12 py-5
  leading-loose
`

const Data = tw.div`
  cursor-pointer
`

const Span = tw.div`
  font-bold
  inline-block
  w-2/5
`

const Button = tw.button`
  bg-white px-6 py-2
  self-end
  transform translate-y-8
  text-blue-600
  font-bold
  rounded-lg
`

const URL = 'https://randomuser.me/api/?results=1'

const App = () => {
  const [user, setUser] = useState(null)

  const usefetch = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data.results[0])
    const user = data.results[0]
    const { cell, email, gender } = user
    const { large: image } = user.picture
    const { first, last} = user.name
    const { date: dob } = user.dob
    const { location: {city, state} } = user


    const newUser = {
      image,
      name: `${first} ${last}`,
      dob,
      gender,
      city,
      state,
      cell,
      email
    }
    setUser(newUser)

    console.log(Object.entries(user))
  }


  useEffect(() => {
    usefetch()
  },[])



  return (
    <Wrapper>
      <Deck>
        <Card>
          <Profile src={user.image} alt="Profile"/>
          <Details>
            {user && Object.entries(user).map((entry, index) => {
              if (index !== 0) {
                return(
                  <Data key={index}>
                    <Span>{entry[0]}</Span>: {entry[1]}
                  </Data>
                )
              }
              return null
            })}
          </Details>
        </Card>
        <Button
        onClick={() => usefetch()}
        >Next</Button>
      </Deck>
    </Wrapper>
  )
}

export default App


