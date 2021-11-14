import { useEffect, useState } from "react"
import tw from "tailwind-styled-components"

const colors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink'
]

const Wrapper = tw.div`
  w-full
  h-full
  flex flex-col
  justify-center
  items-center
  relative
`

const Card = tw.main`
  w-11/12
  min-h-60
  max-w-sm
  rounded-lg
  shadow-xl
  relative
  mt-16

`

const Profile = tw.img`
  w-24
  h-24
  bg-white
  rounded-full
  absolute
  inset-x-1/2
  transform -translate-x-1/2 -translate-y-1/2
  border-none
  outline-none
  text-black
`

const Details = tw.aside`
  mt-16
  text-white
  py-5 px-12
  leading-loose
`
const Button = tw.button`
  bg-white
  px-6 py-2
  transform translate-y-8
  self-end

`

const Span = tw.div`
  font-bold
  w-2/5
  inline-block
`

const Data = tw.div`
  cursor-pointer
`
const Alert = tw.p`
  bg-white
  px-6 py-4
  fixed inset-0
  font-bold text-4xl
`

const Github = tw.div`
  absolute -top-3 right-0
  w-0 h-0
  border-t-20
  border-lb-transparent-20
`

const URL = "https://randomuser.me/api/?results=1"

function App() {

  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(false)
  const [color, setColor] = useState("blue")

  const usefetch = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    const user = data.results[0]
    const { gender, cell, email } = user
    const { large: image} = user.picture
    const { first, last } = user.name
    const { date } = user.dob 
    const {
      location: { city, state }
    } = user

    const newUser = {
      image,
      name: `${first} ${last}`,
      date,
      gender,
      city,
      state,
      cell,
      email
    }

    setUser(newUser)
    setColor(colors[Math.floor(Math.random()*8)])
    console.log(color)
  }

  useEffect(() => {
    usefetch()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    },500)
    return () => clearTimeout(timeout)
  },[alert])

  return (
    <Wrapper className={`bg-${color}-800`}>
      <img 
      style = {{
        position: 'absolute',
        top: '0.875rem',
        right: '0.875rem',
        zIndex: 9999,
        border: "none",
        boxSizing: "content-box",
        overflowX: "hidden"
      }}
      className="img" src="/github.svg" alt="Github" />
      <Github>
      </Github>
      {alert && <Alert className={`text-${color}-600`}>Copied to clipboard</Alert>}
      <Card className={`bg-${color}-600`}>
        <Profile 
        src={user && user.image}
        alt="Profile"/>
        <Details>
          {user && Object.entries(user).map((entry, index) => {
            if (index !== 0) {
              return (
                <Data
                key={index}
                title="Click to copy"
                onClick={() => {
                  setAlert(true)
                  navigator.clipboard.writeText(entry[1])}
                }
                >
                <Span>{ index === 2 ? 'D.o.B' : entry[0].slice(0,1).toUpperCase() + entry[0].slice(1,)}: </Span> 
                {index === 2 ? entry[1].slice(0,10).split('-').reverse().join('-') : entry[1]}
                </Data>
              )
            }
            return null
          })}
        </Details>
      </Card>
      <Button className={`text-${color}-600`}
      onClick={() => usefetch()}
      >Next</Button>
    </Wrapper>
  );
}

export default App;

