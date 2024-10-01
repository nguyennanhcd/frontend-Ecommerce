import { Box, InputLabel, InputLabelProps, MenuItem, Select, SelectProps, styled } from '@mui/material'

interface TCustomSelect extends Omit<SelectProps, 'children'> {
  options: { label: string; value: string | number }[]
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '8px 8px 8px 10px !important',
    height: '38px',
    boxSizing: 'border-box'
  },
  legend: {
    display: 'none'
  }
}))

const CustomPlaceholder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  left: '10px',
  zIndex: 2
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({}))

const CustomSelect = (props: TCustomSelect) => {
  const { value, onChange, label, options, placeholder, fullWidth, ...rest } = props

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {((Array.isArray(value) && !value.length) || !value) && <CustomPlaceholder>{placeholder}</CustomPlaceholder>}
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
    </Box>
  )
}

export default CustomSelect
