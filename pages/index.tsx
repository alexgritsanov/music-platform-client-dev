import React from 'react'
import {Button} from '@mui/material'
import Navbar from '../components/Navbar';
import MainLayout from '../layouts/MainComponent';

const Index = () => {
  return (
      <>
     <MainLayout>
     <Navbar />
      <div className='center'>index
      <h1>Welcome</h1>
      <h3>Здесь собраны лучшие треки</h3>
      </div>

      <style jsx>
          {`
          .center {
              margin-top: 150px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

          }
          `}
      </style>
     </MainLayout>
      </>
    
  )
}

export default Index;