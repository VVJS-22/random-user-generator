import tw from "tailwind-styled-components";


export const Wrapper = tw.div`
  max-w-sm
  min-h-60
  w-11/12
  rounded-lg
  shadow-xl
`;


export const Profile = tw.img`
  w-24 h-24 bg-white rounded-full
  absolute inset-x-1/2
  transform -translate-x-1/2 -translate-y-1/2
`;