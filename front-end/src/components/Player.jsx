import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faBackwardStep, faForwardStep, faCirclePause} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { songsArray } from '../assets/database/songs';

const formatTime = (timeInSeconds) => {
    // pega oas minutos e os segundos arredondando passado para string e completando com 0´s até atingir tamanho 2
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds - minutes * 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
    const splitArray = timeString.split(":");
    const minutes = Number(splitArray[0]);
    const seconds = Number(splitArray[1]);
    return seconds + minutes * 60;
};

const Player = ({ duration, artist, audio }) => {
    const { id } = useParams();
    const aSongsFromArtist = songsArray.filter((currentSongObj, index) => currentSongObj.artist === artist);
    const idIndex = aSongsFromArtist.findIndex(currentSongObj => currentSongObj._id === id);
    const prevSong = (idIndex == 0) ? 0 : idIndex - 1;
    const nextSong = (idIndex == aSongsFromArtist.length - 1) ? aSongsFromArtist.length - 1 : idIndex + 1;

    const audioPlayer = useRef();
    const progressBar = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    // criar variável-estado para mudar o tempo da música em tempo real
    const [currentTime, setCurrentTime] = useState(formatTime(0));
    const durationInSeconds = timeInSeconds(duration);
    const playPause = () => {
        isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (isPlaying) {
            const intervalId = setInterval(() => {
                setCurrentTime(formatTime(audioPlayer.current.currentTime));
                const percent = (audioPlayer.current.currentTime / durationInSeconds) * 100 + '%';
                progressBar.current.style.setProperty("--_progress", percent);
            }, 1000);
            return () => clearInterval(intervalId); 
        }
    }, [isPlaying]);

    return (
        <div className='player'>
            <div className="player__controllers">
                <Link to={`/song/${aSongsFromArtist[prevSong]._id}`}>
                    <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
                </Link>
                <FontAwesomeIcon className="player__icon player__icon--play" 
                                 icon={isPlaying ? faCirclePause : faCirclePlay} 
                                 onClick={() => playPause()} />
                <Link to={`/song/${aSongsFromArtist[nextSong]._id}`}>
                    <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
                </Link>
            </div>

            <div className="player__progress">
                <p>{currentTime}</p>
                <div className="player__bar">
                    <dir ref={progressBar} className="player__bar-progress" />
                </div>
                <p>{duration}</p>
            </div>

            <audio ref={audioPlayer} src={audio}/>
        </div>
    )
};

export default Player;