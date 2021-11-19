import { Wrapper } from './style/Data'


const Data = ({key, title, onClick, children}) => {
    return (
        <Wrapper
        key={key}
        title={title}
        onClick={onClick}
        >
            {children}
        </Wrapper>
    )
}

export default Data
