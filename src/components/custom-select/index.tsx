import { MenuItem, Select, SelectProps, styled } from '@mui/material'

interface TCustomSelect extends Omit<SelectProps, 'children'> {
  options: { label: string; value: string | number }[]
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '8px 8px 8px 10px !important',
    height: '41px',
    boxSizing: 'border-box'
  }
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({}))

const CustomSelect = (props: TCustomSelect) => {
  const { value, onChange, label, options, fullWidth, ...rest } = props

  return (
    <StyledSelect fullWidth={fullWidth} value={value} label={label} onChange={onChange} {...rest}>
      {options?.length > 0 ? (
        options?.map(opt => {
          return (
            <StyledMenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </StyledMenuItem>
          )
        })
      ) : (
        <StyledMenuItem>No Data</StyledMenuItem>
      )}
    </StyledSelect>
  )
}

export default CustomSelect
