'use client'

// **next
import { NextPage } from 'next'

// **mui
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

// **components
import IconifyIcon from 'src/components/Icon'

// **react
import ListVerticalLayout from './VerticalLayoutList'

const drawerWidth: number = 240

type TProps = {
  open?: boolean
  toggleDrawer: () => void
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})<{ open?: boolean }>(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box'
  },
  ...(open && {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12)
    }
  })
}))

const VerticalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
  return (
    <Drawer variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
          overflowX: 'hidden'
        }}
      >
        <IconButton style={{ transform: 'translateX(0.3rem)' }} onClick={toggleDrawer}>
          <IconifyIcon icon='mingcute:left-fill' />
        </IconButton>
      </Toolbar>
      <Divider />
      <ListVerticalLayout open={Boolean(open)} />
    </Drawer>
  )
}

export default VerticalLayout
