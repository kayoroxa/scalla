import styled from 'styled-components'
interface IProps {
  value: (number | null)[]
}

export const Container = styled.div`
  display: flex;
  .valor {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    padding: 8px;

    background: #fff;
    border: 2px solid #666;
    color: #666;
    text-align: center;
  }
`

const Test = ({ value }: IProps) => {
  return (
    <Container>
      {value.map((valor, index) => (
        <div className="valor" key={index}>
          {valor}
        </div>
      ))}
    </Container>
  )
}

export default Test
