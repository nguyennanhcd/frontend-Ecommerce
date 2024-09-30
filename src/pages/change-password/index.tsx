// **import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** views
import LayoutNoAppBar from 'src/views/layout/LayoutNoAppBar'
import ChangePassword from 'src/views/pages/change-password'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <ChangePassword />
}

export default Index

Index.getLayout = (page: ReactNode) => <LayoutNoAppBar>{page}</LayoutNoAppBar>
