// **import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** views
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const ManageSystem: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default ManageSystem
