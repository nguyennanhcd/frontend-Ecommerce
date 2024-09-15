import * as React from 'react'
import { NextPage } from 'next'
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { VerticalItem } from 'src/configs/layout'
import IconifyIcon from 'src/components/Icon'

type TProps = {}

const ListVerticalLayout: NextPage<TProps> = () => {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {VerticalItem.map((item, id) => {
        return (
          <React.Fragment key={id}>
            <ListItemButton onClick={item.children && handleClick}>
              <ListItemIcon>
                <IconifyIcon icon={item?.icon} />
              </ListItemIcon>
              <ListItemText primary={item?.title} />
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <>
                {item.children.map(child => {
                  return (
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <IconifyIcon icon={child.icon} />
                          </ListItemIcon>
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  )
                })}
              </>
            )}
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default ListVerticalLayout

/*
import * as React from 'react'
import { NextPage } from 'next'
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { VerticalItem } from 'src/configs/layout'
import IconifyIcon from 'src/components/Icon'

type TProps = {}

const ListVerticalLayout: NextPage<TProps> = () => {
  // Dùng một đối tượng để lưu trạng thái mở/đóng cho từng mục
  const [openItems, setOpenItems] = React.useState<Record<number, boolean>>({})

  // Hàm xử lý việc mở/đóng cho từng mục
  const handleClick = (id: number) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {VerticalItem.map((item, id) => {
        return (
          <React.Fragment key={id}>
            <ListItemButton onClick={() => handleClick(id)}>
              <ListItemIcon>
                <IconifyIcon icon={item?.icon} />
              </ListItemIcon>
              <ListItemText primary={item?.title} />
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <Collapse in={!!openItems[id]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.children.map((child, childId) => (
                    <ListItemButton key={childId} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <IconifyIcon icon={child.icon} />
                      </ListItemIcon>
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default ListVerticalLayout

*/
