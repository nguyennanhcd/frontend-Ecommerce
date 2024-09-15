import * as React from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'
import { BoxProps, styled } from '@mui/system'

type TProps = {
  children: React.ReactNode
}

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh'
}))

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWrapper>
      <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>{children}</Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
