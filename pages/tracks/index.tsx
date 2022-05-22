import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { stopCoverage } from 'v8'
import TrackList from '../../components/TrackList'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainComponent'
import { wrapper, NextThunkDispatch } from '../../store'
import { fetchTracks, searchTracks } from '../../store/actions-creators/track'
import { ITrack } from '../../types/tracks'

// import { store } from 'next-redux-wrapper'

const Index = () => {
    const router = useRouter()
    // const { } = useActions()
    const { tracks, error } = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>('')
    const dispatch = useDispatch() as NextThunkDispatch
    const [timer, setTimer] = useState(null)

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value));
            }, 500)

        )
    }

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }
    // const tracks: ITrack[] = [
    //     {
    //         _id: "test",
    //         name: "test",
    //         artist: "test",
    //         text: "test",
    //         listens: 24,
    //         picture: "test",
    //         audio: "http://localhost:5000/audio/959b85d5-de81-4afd-8248-1c2678be790b.m4a",
    //         comments: []
    //     }
    // ]
    return (
        <MainLayout title={'Tracklist - Music Platform'}>
            <Grid container justifyContent="center">
                <Card style={{ width: 900 }}>
                    <Box p={3}>
                        <Grid container justifyContent={'space-between'}>
                            <h1>
                                Tracklist
                            </h1>
                            <Button onClick={() => router.push('/tracks/create')}>Upload</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}


                    />
                    <TrackList tracks={tracks} />

                </Card>
            </Grid>
        </MainLayout>

    )
}

export default Index


// export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchTracks())
// })




export const getServerSideProps = wrapper.getServerSideProps(
    store => async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchTracks());

        return { props: {} }
    }
);