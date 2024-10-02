// ** MUI import
import { Box, BoxProps, IconButton, Popover, styled, Typography } from '@mui/material'

// ** React
import React from 'react'
import IconifyIcon from '../../../../components/Icon'
import { useTranslation } from 'react-i18next'
import { getLanguageOptions } from 'src/configs/i18n'

type TProps = {}

interface TStyledItem extends BoxProps {
  selected: boolean
}

const StyleItemLanguage = styled(Box)<TStyledItem>(({ theme, selected }) => ({
  cursor: 'pointer',
  '.MuiTypography-root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.6rem 0.8rem',
    backgroundColor: selected ? theme.palette.primary.main : 'none',
    color: selected ? 'white' : 'none'
  },
  '&:hover': {
    backgroundColor: selected ? theme.palette.action.selected : theme.palette.action.hover
  }
}))

const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  // **hooks
  const { i18n } = useTranslation()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleOnChangeLang = (langCode: string) => {
    i18n.changeLanguage(langCode)
    handleClose()
  }

  const languageOptions = getLanguageOptions()

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick} color='inherit'>
        <IconifyIcon icon='iconoir:language' />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        sx={{
          transform: 'translate(-4.5rem, 0.1rem)'
        }}
      >
        {languageOptions.map(lang => (
          <StyleItemLanguage
            selected={lang.value === i18n.language}
            key={lang.value}
            onClick={() => handleOnChangeLang(lang.value)}
            padding={'0.5rem '}
            sx={{ width: { xs: '4rem', md: '9rem' } }}
          >
            <Typography borderRadius={'0.4rem'} height={'2.35rem'}>
              {lang.lang}
            </Typography>
          </StyleItemLanguage>
        ))}
      </Popover>
    </>
  )
}

export default LanguageDropdown
