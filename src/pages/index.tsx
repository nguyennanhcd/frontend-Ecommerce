'use client'
import Head from 'next/head'
import { ReactNode } from 'react'
import LayoutNoAppBar from 'src/views/layout/LayoutNoAppBar'

export default function Home() {
  return (
    <>
      <Head>
        <title>dung_anh_shop</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  )
}

Home.getLayout = (page: ReactNode) => <LayoutNoAppBar>{page}</LayoutNoAppBar>
Home.guestGuard = false
Home.authGuard = false
