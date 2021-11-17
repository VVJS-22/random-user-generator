import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";

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

const Deck = tw.div`
  flex flex-col justify-center items-center
  z-10
`;

const Card = tw.div`
  max-w-sm
  min-h-60
  w-11/12
  rounded-lg
  shadow-xl
`;

const Profile = tw.img`
  w-24 h-24 bg-white rounded-full
  absolute inset-x-1/2
  transform -translate-x-1/2 -translate-y-1/2
`;

const Details = tw.div`
  mt-16 text-white px-12 py-5
  leading-loose
`;

const Data = tw.div`
  cursor-pointer
`;

const Span = tw.div`
  font-bold
  inline-block
  w-2/5
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
        <Card className={`bg-${color}-600`}>
          <Profile src={user && user.image} alt="Profile" />
          <Details>
            {user &&
              Object.entries(user).map((entry, index) => {
                if (index !== 0) {
                  return (
                    <Data
                      key={index}
                      title="Click to copy"
                      onClick={() => {
                        setAlert(true);
                        navigator.clipboard.writeText(entry[1]);

                      }}
                    >
                      <Span>
                        {index === 2
                          ? "D.o.B"
                          : entry[0].slice(0, 1).toUpperCase() +
                            entry[0].slice(1)}
                      </Span>
                      :{" "}
                      {index === 2
                        ? entry[1].slice(0, 10).split("-").reverse().join("-")
                        : index === 7
                        ? entry[1]
                        : entry[1].slice(0, 1).toUpperCase() +
                          entry[1].slice(1)}
                    </Data>
                  );
                }
                return null;
              })}
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