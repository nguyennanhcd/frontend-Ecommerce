// **import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import LayoutNoAppBar from 'src/views/layout/LayoutNoAppBar'

// ** views
import MyProfilePage from 'src/views/pages/my-profile'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <MyProfilePage />
}

export default Index
Index.getLayout = (page: ReactNode) => <LayoutNoAppBar>{page}</LayoutNoAppBar>
