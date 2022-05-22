import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layouts/MainComponent'
import { ITrack } from '../../types/tracks'

const TrackPage = ({ serverTrack }) => {
    const [track, setTrack] = useState(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')


    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({ ...track, comments: [...track.comments, response.data] })
        } catch (e) {
            console.log(e)
        }
    }

    // const track: ITrack = {
    //     _id: "test",
    //     name: "test",
    //     artist: "test",
    //     text: "test",
    //     listens: 24,
    //     picture: "test",
    //     audio: "test",
    //     comments: []
    // }
    return (
        <MainLayout title={"Music Platform - " + track.name + " - " + track.artist}
            keywords={"Music, artists, " + track.name + " - " + track.artist}
        >
            <Button variant={'outlined'}
                style={{ fontSize: 32 }}
                onClick={() => router.push('/tracks/')}>
                Back
            </Button>
            <Grid container style={{ margin: '20px 0 ' }} >
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} />
                <div style={{ marginLeft: 30 }}>
                    <h1>{track.name}</h1>
                    <h1>{track.artist}</h1>
                    <h1>Прослушиваний -  {track.listens}</h1>
                </div>
            </Grid>
            <h1>
                Lyrics:
            </h1>
            <p>{track.text} </p>
            <h1>Comments</h1>
            <Grid container>
                <TextField {...username} label='Your name' fullWidth />
                <TextField {...text} label='Comment' fullWidth multiline rows={4} />
                <Button onClick={addComment}>Send</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Author - {comment.username}</div>
                        <div>Comment - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>

    )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    console.log(params)
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}