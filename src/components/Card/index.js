import { Wrapper, Profile } from './style/Card'

const Card = ({className, user, children}) => {
    return (
        <Wrapper className={className}>
            <Profile src={user && user.image} alt="Profile" />
            {children}
        </Wrapper>
    )
}

export default Card
