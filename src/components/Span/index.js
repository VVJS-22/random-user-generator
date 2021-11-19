import { Wrapper } from './style/Span'


const Span = ({entry, index }) => {
    return (
        <Wrapper>
            {index === 2
                        ? "D.o.B"
                        : entry[0].slice(0, 1).toUpperCase() + entry[0].slice(1)}
        </Wrapper>
    )
}

export default Span
