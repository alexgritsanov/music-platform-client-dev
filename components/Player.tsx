import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

import styles from '../styles/Player.module.scss'
import { ITrack } from '../types/tracks'
import TrackProgress from './TrackProgress'

let audio;

const Player = () => {
    // const track: ITrack = {
    //     _id: "test",
    //     name: "test",
    //     artist: "test",
    //     text: "test",
    //     listens: 24,
    //     picture: "test",
    //     audio: "http://localhost:5000/audio/959b85d5-de81-4afd-8248-1c2678be790b.m4a",
    //     comments: []
    // }
    // const active = false 
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    // 1 55 08  variants

    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } = useActions()

    const setAudio = () => {
        if (active) {
            audio.src = "http://localhost:5000/" + active.audio
            audio.volume = volume / 100
            console.log(audio)
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))

            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }

    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio()


        } else {
            setAudio()
            play()
        }
    }, [active])



    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if (!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <Grid container direction='column' style={{ width: 200, margin: '0 20px' }} >
                <div>{active?.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{ marginLeft: 'auto' }} />
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    )
}

export default Player