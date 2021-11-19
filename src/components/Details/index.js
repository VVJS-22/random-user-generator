import { Wrapper } from './style/Details'
import Data from './Data'

const Details = ({user, func, children}) => {
    return (
        <Wrapper>
            <Data user={user} func={func}/>
            {children}
        </Wrapper>
    )
}

export default Details
