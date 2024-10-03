// ** next
import { NextPage } from 'next'

// ** mui
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  styled,
  Tooltip,
  useTheme
} from '@mui/material'

// ** react
import React, { useEffect, useState } from 'react'

// ** config
import { VerticalItem } from 'src/configs/layout'

// ** components
import IconifyIcon from 'src/components/Icon'
import { useRouter } from 'next/router'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

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
  activePath: string | null
  setActivePath: React.Dispatch<React.SetStateAction<string | null>>
}

interface TListItemText extends ListItemTextProps {
  active: boolean
}

const StyledListItemText = styled(ListItemText)<TListItemText>(({ theme, active }) => ({
  '.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    color: active ? `${theme.palette.primary.main} !important` : `${theme.palette.customColors.main}, 0.78`,
    fontWeight: active ? 540 : 200
  }
}))

const RecursiveListItem: NextPage<TListItems> = ({
  items,
  level,
  openItems,
  setOpenItems,
  disabled,
  activePath,
  setActivePath
}) => {
  const theme = useTheme()
  const router = useRouter()

  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItems({
        [title]: !openItems[title]
      })
    }
  }

  console.log(openItems)

  const handleSelectItem = (path: string) => {
    setActivePath(path)
    if (path && !disabled) {
      router.push(path)
    }
  }

  return (
    <>
      {items.map((item: any, id: number) => (
        <React.Fragment key={id}>
          <ListItemButton
            sx={{
              padding: `0.8rem 0.2rem 0.8rem ${level * 0.9}rem`,
              margin: '1px 0',
              backgroundColor:
                (activePath && item.path === activePath) || openItems[item.title]
                  ? `${hexToRGBA(theme.palette.primary.main, 0.15)} !important`
                  : theme.palette.customColors.main
            }}
            onClick={() => item.children && handleClick(item.title)}
          >
            <ListItemIcon>
              <Box
                sx={{
                  borderRadius: '8px',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    (activePath && item.path === activePath) || openItems[item.title]
                      ? `${theme.palette.primary.main} !important`
                      : theme.palette.customColors.lightPaperBg
                }}
              >
                <IconifyIcon
                  icon={item?.icon}
                  style={{
                    color:
                      item.path === activePath || openItems[item.title]
                        ? `${theme.palette.customColors.lightPaperBg}`
                        : `${theme.palette.customColors.main}, 0.78`
                  }}
                />
              </Box>
            </ListItemIcon>
            {!disabled && (
              <Tooltip title={item?.title}>
                <StyledListItemText
                  primary={item?.title}
                  onClick={() => handleSelectItem(item.path)}
                  active={Boolean((activePath && item.path === activePath) || !!openItems[item.title])}
                />
              </Tooltip>
            )}
            {item?.children && item?.children.length > 0 && (
              <>
                {(activePath && item.path === activePath) || openItems[item.title] ? (
                  <IconifyIcon
                    icon='mdi:expand-less'
                    style={{
                      color: openItems[item.title]
                        ? `${theme.palette.primary.main}`
                        : `${theme.palette.customColors.main}, 0.78`
                    }}
                  />
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
                activePath={activePath}
                setActivePath={setActivePath}
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
  const [activePath, setActivePath] = useState<null | string>('')

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
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0 }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem
        items={VerticalItem}
        level={1}
        disabled={open}
        openItems={openItems}
        setOpenItems={setOpenItems}
        activePath={activePath}
        setActivePath={setActivePath}
      />
    </List>
  )
}

export default ListVerticalLayout
