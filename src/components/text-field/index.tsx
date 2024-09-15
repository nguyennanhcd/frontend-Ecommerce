// ** MUI Imports
import { TextFieldProps, TextField, styled } from '@mui/material'

const TextFieldStyle = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputLabel-root': {
    transform: 'none',
    lineHeight: 1.2,
    position: 'relative',
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.body2.fontSize
  },
  '& .MuiInputBase-root': {
    borderRadius: 8,
    backgroundColor: 'transparent !important',
    border: `1px solid rgba(${theme.palette.customColors.main}, 0.35)`,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.shorter
    }),
    '&:before, &:after': {
      display: 'none'
    },
    '.MuiInputBase-input': {
      padding: theme.spacing(2.3),
      boxShadow: theme.palette.primary.main
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: theme.shadows[2]
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
      boxShadow: theme.shadows[1]
    },
    '&.Mui-warning': {
      borderColor: theme.palette.warning.main,
      boxShadow: theme.shadows[1]
    },
    '&.Mui-disabled': {
      backgroundColor: `${theme.palette.action.selected} !important`,
      borderColor: theme.palette.action.disabledBackground
    },
    '&:hover:not(.Mui-disabled)': {
      borderColor: theme.palette.primary.light // Customize the border color on hover
    }
  },
  '& .MuiFormHelperText-root': {
    lineHeight: 1.1534,
    margin: theme.spacing(1, 0, 0),
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    '&.Mui-error': {
      color: theme.palette.error.main
    }
  }
}))

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, variant = 'filled', ...rests } = props

  return (
    <TextFieldStyle
      size={size}
      InputLabelProps={{ ...InputLabelProps, shrink: true, 'aria-placeholder': 'padding: 0' }}
      variant={variant}
      {...rests}
    />
  )
}

export default CustomTextField
