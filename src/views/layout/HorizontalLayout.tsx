// **next
import * as React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// **mui
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// **components
import IconifyIcon from 'src/components/Icon'
import UserDropDown from 'src/views/layout/components/user-drop-down'
import ModeToggle from './components/mode-toggle'
import LanguageDropdown from './components/language-dropdown'

// **hooks
import { useAuth } from 'src/hooks/useAuth'
import { Button } from '@mui/material'

// ** config route
import { ROUTE_CONFIG } from 'src/configs/route'

// ** 18n
import { t } from 'i18next'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

type TProps = {
  open?: boolean
  toggleDrawer: () => void
  isHideMenu?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '24px',
          margin: '0 0.5rem'
        }}
      >
        {!isHideMenu && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <IconifyIcon icon='material-symbols:menu' />
          </IconButton>
        )}
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          {t('dashboard')}
        </Typography>
        <LanguageDropdown />
        <ModeToggle />
        {user ? (
          <UserDropDown />
        ) : (
          <Button
            variant='contained'
            sx={{ width: 'auto', ml: '0.3rem' }}
            onClick={() => router.push(ROUTE_CONFIG.LOGIN)}
          >
            {t('sign_in')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default HorizontalLayout
