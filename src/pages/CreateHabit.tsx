import { MenuItem, Paper, TextField } from '@material-ui/core'
import { useState } from 'react'

export default function CreateHabit() {
  const currencies = [
    {
      value: 'timer',
      label: 'timer',
    },
    {
      value: 'repetition',
      label: 'repetition',
    },
  ]
  const [currency, setCurrency] = useState('timer')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value)
  }
  return (
    <Paper>
      <TextField
        id="outlined-select-currency"
        select
        label="Tipo"
        value={currency}
        onChange={handleChange}
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField id="outlined-helperText" label="Nome" />
    </Paper>
  )
}
