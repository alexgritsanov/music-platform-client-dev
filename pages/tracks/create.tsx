import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload'
import StepWrapper from '../../components/StepWrapper'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layouts/MainComponent'


const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()




    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)

        } else {
            console.log('this is step 3 ')
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            console.log(name.value, text.value, artist.value, picture, audio)
            console.log(formData)
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }

    }

    const back = () => {
        setActiveStep(prev => prev - 1)
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&

                    <Grid container direction={'column'} style={{ padding: 20 }} >
                        <TextField {...name} style={{ marginTop: 10 }} label={"Track name"} />
                        <TextField {...artist} style={{ marginTop: 10 }} label={"Track name"} />
                        <TextField {...text} style={{ marginTop: 10 }} multiline rows={3} label={"Track name"} />
                    </Grid>
                }

                {activeStep === 1 && <FileUpload setFile={setPicture} accept="image/*" >
                    <Button>Upload Cover</Button>
                </FileUpload>
                }
                {activeStep === 2 && <FileUpload setFile={setAudio} accept="audio/*" >
                    <Button>Upload Audio</Button>
                </FileUpload>}

            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep < 1} onClick={back}>
                    Back
                </Button>
                <Button disabled={activeStep > 2} onClick={next}>
                    Next
                </Button>
            </Grid>
        </MainLayout>

    )
}

export default Create