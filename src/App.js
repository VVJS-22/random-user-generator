import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { Deck, Card, Details } from './components'


const colors = [
  "pink",
  "purple",
  "indigo",
  "blue",
  "green",
  "yellow",
  "red",
  "gray",
];

const Wrapper = tw.div`
  h-full
  flex justify-center items-center
`;

const Button = tw.button`
  bg-white px-6 py-2
  self-end
  transform translate-y-8
  font-bold
  rounded-lg
`;

const Alert = tw.p`
  bg-white
  px-6
  py-4
  font-bold
  text-4xl
  fixed inset-0
`

const URL = "https://randomuser.me/api/?results=1";

const App = () => {
  const [user, setUser] = useState(null);
  const [color, setColor] = useState("blue");
  const [alert, setAlert] = useState(false)

  const usefetch = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    const user = data.results[0];
    const { cell, email, gender } = user;
    const { large: image } = user.picture;
    const { first, last } = user.name;
    const { date: dob } = user.dob;
    const {
      location: { city, state },
    } = user;

    const newUser = {
      image,
      name: `${first} ${last}`,
      dob,
      gender,
      city,
      state,
      cell,
      email,
    };
    setUser(newUser);
    setColor(colors[Math.floor(Math.random() * 8)]);
  };

  useEffect(() => {
    usefetch();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    },500)

    return () => clearTimeout(timeout)
  },[alert])

  return (
    <Wrapper className={`bg-${color}-800`}>
      {alert && <Alert>Copied to clipboard</Alert>}
      <Deck>
        <Card className={`bg-${color}-600`} user={user}>
          
          <Details user={user} func={setAlert}> 
            
          </Details>
        </Card>
        <Button
          className={`text-${color}-600`}
          onClick={() => {
            usefetch();
          }}
        >
          Next
        </Button>
      </Deck>
    </Wrapper>
  );
};

export default App;