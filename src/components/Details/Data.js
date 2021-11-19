import { Wrapper } from './style/Data'
import tw from "tailwind-styled-components";

const Span = tw.div`
  font-bold
  inline-block
  w-2/5
`;

const Data = ({user, func}) => {
    return (
        <Wrapper user={user}>
            {user &&
              Object.entries(user).map((entry, index) => {
                if (index !== 0) {
                  return (
                    <Data
                      key={index}
                      title="Click to copy"
                      onClick={() => {
                        func(true);
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
        </Wrapper>
    )
}

export default Data
