// ** MUI import
import { IconButton } from '@mui/material'

// ** React
import React from 'react'

// ** Icon
import IconifyIcon from '../../../../components/Icon'

// ** settings
import { useSettings } from 'src/hooks/useSettings'

// ** Types
import { Mode } from 'src/types/layouts'

type TProps = {}

const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }

  const handleToggleMode = () => {
    if (settings.mode === 'dark') {
      handleModeChange('light')
    } else {
      handleModeChange('dark')
    }
  }

  return (
    <IconButton color='inherit' onClick={handleToggleMode}>
      <IconifyIcon icon={settings.mode === 'light' ? 'tdesign:mode-dark' : 'ic:baseline-light-mode'} />
    </IconButton>
  )
}

export default ModeToggle
