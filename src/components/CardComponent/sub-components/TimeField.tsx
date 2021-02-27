import NumberFormat from 'react-number-format'
import { TextField } from '@material-ui/core'

interface IProps {
  value: number
  onChange?: any
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

export default function TimeField({ value, onChange }: IProps) {
  const valueFormatado = Number(
    new Date(Math.round(value) * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/\:/gi, '')
  )

  function cardExpiry(val: any) {
    const getHour = val.slice(-6, -4)
    const getMinute = val.slice(-4, -2)
    const getSecond = val.slice(-2)
    const hour = Number(getHour) ? `${getHour}h` : ''
    const minute = Number(getMinute) ? `${getMinute}m` : ''
    const second = Number(getSecond) ? `${getSecond}s` : ''

    return `${hour} ${minute} ${second}`.slice(-11)
  }

  function NumberFormatCustom(props: NumberFormatCustomProps) {
    const { inputRef, onChange, ...other } = props

    return (
      <NumberFormat
        {...other}
        style={{ textAlign: 'right' }}
        getInputRef={inputRef}
        // onValueChange={values => {
        //   onChange({
        //     target: {
        //       name: props.name,
        //       value: values.floatValue,
        //     },
        //   })
        // }}
        format={cardExpiry}
        // format="##h ##m"
        // placeholder="00h 00m 00s"
        // mask={'_'}
        isNumericString
      />
    )
  }
  return (
    <TextField
      // id="outlined-number"
      label="Fazer"
      inputProps={{ style: { textAlign: 'right' } }}
      value={valueFormatado}
      onChange={onChange}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
      variant="outlined"
    />
  )
}
