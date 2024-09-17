// ** MUI import
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'

// ** React
import React from 'react'
import IconifyIcon from '../../../../components/Icon'
import Image from 'next/image'
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {}

const UserDropDown = (props: TProps) => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const { user, logout } = useAuth()

  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigateMyProfile = () => {
    router.push(`/${ROUTE_CONFIG.MY_PROFILE}`)
    handleClose()
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Account')}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.avatar ? (
                <Image src={user?.avatar || ''} alt='user' style={{ height: 'auto', width: 'auto' }} />
              ) : (
                <IconifyIcon icon='basil:user-outline' />
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          {user?.email} {user?.middleName} {user?.lastName}
        </MenuItem>
        <MenuItem onClick={handleNavigateMyProfile}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default UserDropDown
