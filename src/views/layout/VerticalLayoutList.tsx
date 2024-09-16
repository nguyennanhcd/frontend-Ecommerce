// ** next
import { NextPage } from 'next'

// ** mui
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// ** react
import React, { useState } from 'react'

// ** config
import { VerticalItem } from 'src/configs/layout'

// ** components
import IconifyIcon from 'src/components/Icon'

type TProps = {}

const RecursiveListItem = ({ items, level }: { items: any; level: number }) => {
  const [openItem, setOpenItem] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenItem(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <>
      {items.map((item: any, id: number) => (
        <React.Fragment key={id}>
          <ListItemButton
            sx={{ padding: `0.5rem 0.2rem 0.5rem ${level * 0.9}rem`, transform: 'translateX(-0.4rem)' }}
            onClick={() => item.children && handleClick(item.title)}
          >
            <ListItemIcon>
              <IconifyIcon icon={item?.icon} />
            </ListItemIcon>
            <ListItemText primary={item?.title} />
            {item?.children && item?.children.length > 0 && (
              <>
                {openItem[item.title] ? <IconifyIcon icon='mdi:expand-less' /> : <IconifyIcon icon='mdi:expand-more' />}
              </>
            )}
          </ListItemButton>
          {item.children && item.children.length > 0 && (
            <Collapse in={openItem[item.title]} timeout='auto' unmountOnExit>
              <RecursiveListItem items={item.children} level={level + 1} />
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = () => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem items={VerticalItem} level={1} />
    </List>
  )
}

export default ListVerticalLayout
