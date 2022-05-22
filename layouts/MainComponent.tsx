import { Container } from '@mui/system'
import Head from 'next/head'
import React from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

interface MainLayoutProps {
  title?: string;
  desription?: string;
  keywords?: string;
}

const MainLayout = ({ children, title, description, keywords }) => {
  // const  { children } = props ; 
  console.log("title is " + title)
  return (
    <>
      <Head>
        <title>{title || 'Music Platform'}</title>
        <meta name='description' content={'Music Platform' + description}></meta>
        <meta name='robots' content="index, follow" />
        <meta name='keywords' content={keywords || "Music, tracks, artists"} />
        <meta name='viewport' content="width=device-width, initial-scale=1" />


      </Head>
      <Navbar />
      <Container style={{ margin: '90px 0', maxWidth: '100%' }}>
        {children}
      </Container>
      <Player />

    </>
  )
}

export default MainLayout