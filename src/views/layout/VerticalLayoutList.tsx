// ** next
import { NextPage } from 'next'

// ** mui
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  styled,
  Tooltip
} from '@mui/material'

// ** react
import React, { useEffect, useState } from 'react'

// ** config
import { VerticalItem } from 'src/configs/layout'

// ** components
import IconifyIcon from 'src/components/Icon'

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openItems: {
    [key: string]: boolean
  }
  items: any
  setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  disabled: boolean
}

const StyledListItemText = styled(ListItemText)<ListItemTextProps>(({ theme }) => ({
  '.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  }
}))

const RecursiveListItem: NextPage<TListItems> = ({ items, level, openItems, setOpenItems, disabled }) => {
  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItems(prev => ({
        ...prev,
        [title]: !prev[title]
      }))
    }
  }

  return (
    <>
      {items.map((item: any, id: number) => (
        <React.Fragment key={id}>
          <ListItemButton
            sx={{ padding: `0.8rem 0.2rem 0.8rem ${level * 0.9}rem` }}
            onClick={() => item.children && handleClick(item.title)}
          >
            <ListItemIcon>
              <IconifyIcon icon={item?.icon} />
            </ListItemIcon>
            {!disabled && (
              <Tooltip title={item?.title}>
                <StyledListItemText primary={item?.title} />
              </Tooltip>
            )}
            {item?.children && item?.children.length > 0 && (
              <>
                {openItems[item.title] ? (
                  <IconifyIcon icon='mdi:expand-less' />
                ) : (
                  <IconifyIcon icon='mdi:expand-more' />
                )}
              </>
            )}
          </ListItemButton>
          {item.children && item.children.length > 0 && (
            <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
              <RecursiveListItem
                items={item.children}
                level={level + 1}
                openItems={openItems}
                setOpenItems={setOpenItems}
                disabled={disabled}
              />
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (open) {
      handleToggleAll()
    }
  }, [open])

  const handleToggleAll = () => {
    setOpenItems({}) // Reset all open items when Drawer closes
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem
        items={VerticalItem}
        level={1}
        disabled={open}
        openItems={openItems}
        setOpenItems={setOpenItems}
      />
    </List>
  )
}

export default ListVerticalLayout
