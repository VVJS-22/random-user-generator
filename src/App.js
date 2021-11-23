import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { Deck, Card, Details, Span, Data } from './components'
import Loader from "./components/Loader";


const bgColors = [
  "bg-pink-800",
  "bg-purple-800",
  "bg-indigo-800",
  "bg-blue-800",
  "bg-green-800",
  "bg-yellow-800",
  "bg-red-800",
  "bg-gray-800",
];

const bglColors = [
  "bg-pink-600",
  "bg-purple-600",
  "bg-indigo-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-gray-600",
];

const Wrapper = tw.div`
  h-full
  flex justify-center items-center
`;

const Button = tw.button`
  text-white px-6 py-2
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
  const [bgColor, setBgColor] = useState("blue");
  const [bglColor, setBglColor] = useState("blue");
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const dateFormater = (entry) => {
    return entry
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("-")
  }
  // 1968-10-03T20:08:23Z0 => 1968-10-03
  // [1968,10,03] // [03,10,1968] => 03-10-1968

  const capitalize = (entry) => {
    return entry
              .slice(0, 1)
              .toUpperCase() 
              + entry.slice(1)
  }
  // f => F + emale => Female

  const copy = (text) => {
    return navigator.clipboard.writeText(text)
  }

  const usefetch = async () => {
    try {
      setLoading(true)
      const response = await fetch(URL);
      const data = await response.json();
      setLoading(false)
      console.log(data)
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
      const randomColor = Math.floor(Math.random() * 8)
      setBgColor(bgColors[randomColor]);
      setBglColor(bglColors[randomColor]);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    
    
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
    <>
    {loading && <Loader />}
    <Wrapper className={`${bgColor}`}>
      {alert && <Alert>Copied to clipboard</Alert>}
      <Deck>
        <Card className={`${bglColor}`} user={user}>
          <Details> 
            {user &&
              Object.entries(user).map((entry, index) => {
                /*
                  user = {
                    name: harish,
                    gender: male,
                    city: chennai
                  }

                  user = [[name,harish],[gender,male],[city,chennai]]
                */
                if (index !== 0) {
                  return (
                    <Data
                      key={index}
                      title="Click to copy"
                      onClick={() => {
                        setAlert(true);
                        copy(entry[1])
                      }}
                    >
                      <Span index={index} entry={entry} />
                      :{" "}
                      {
                        index === 2
                          ? dateFormater(entry[1])
                        : index === 7
                          ? entry[1]
                          : capitalize(entry[1])
                      }
                    </Data>
                  );
                }
                return null;
              })}
          </Details>
        </Card>
        <Button
          className={`${bglColor}`}
          onClick={() => {
            usefetch();
          }}
        >
          Next
        </Button>
      </Deck>
    </Wrapper>
    </>
  );
};

export default App;