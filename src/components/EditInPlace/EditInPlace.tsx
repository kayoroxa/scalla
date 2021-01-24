import { TextField } from '@material-ui/core'
import { useRef } from 'react'

import { ContainerEditInPlace } from './styles-edit-in-place'

interface IProps {
  value: string | number
  label?: string | number
  onChangeValue: Function
}
const EditInPlace = ({ value, onChangeValue, label }: IProps) => {
  const done = () => {
    onChangeValue(
      inputRef?.current?.textContent !== ''
        ? inputRef?.current?.textContent
        : '*'
    )
  }
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <ContainerEditInPlace>
      <span
        suppressContentEditableWarning={true}
        className="textArea"
        onBlur={done}
        contentEditable
        ref={inputRef}
      >
        {value}
      </span>
      {/* <TextField
        label={label}
        defaultValue={value}
        variant="outlined"
        onBlur={done}
      /> */}
    </ContainerEditInPlace>
  )
}

export default EditInPlace
