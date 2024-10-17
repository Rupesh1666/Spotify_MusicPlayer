import React, { useRef, useEffect, useState } from 'react';

const PlayerControls = ({ currentSong, isPlaying, setIsPlaying, nextSong, previousSong }) => {
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(50);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showVolume, setShowVolume] = useState(false); // State for toggling volume control visibility

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            if (isPlaying) {
                audio.play().catch((error) => console.error('Error playing audio:', error));
            } else {
                audio.pause();
            }
        }

        const handleLoadedMetadata = () => {
            if (audio) setDuration(audio.duration);
        };

        const handleEnded = () => {
            nextSong();
            setIsPlaying(true);
        };

        const handleTimeUpdate = () => {
            if (audio) {
                setCurrentTime(audio.currentTime);
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                setProgress(progressPercent);
            }
        };

        if (audio) {
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [isPlaying, currentSong, nextSong, setIsPlaying]);

    const handleProgressChange = (event) => {
        const audio = audioRef.current;
        const newProgress = event.target.value;
        if (audio && audio.duration) {
            audio.currentTime = (newProgress / 100) * audio.duration;
            setProgress(newProgress);
        }
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        const audio = audioRef.current;
        if (audio) {
            audio.volume = newVolume / 100;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <div className="player-controls">
            <audio ref={audioRef} src={currentSong?.url} preload="metadata" />
            <div className="progress-container">
                <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    className="progress-bar"
                    value={progress}
                    onChange={handleProgressChange}
                    min="0"
                    max="100"
                />
                <span>{formatTime(duration)}</span>
            </div>
            <div className="control-buttons">
                <p>...</p>
                <button onClick={previousSong} aria-label="Previous Song">⏪</button>
                <button onClick={() => setIsPlaying(prev => !prev)} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button onClick={nextSong} aria-label="Next Song">⏩</button>

                <div className="volume-control">
                    <span onClick={() => setShowVolume(!showVolume)} style={{ cursor: 'pointer' }}>🔊</span>
                    {showVolume && (
                        <input
                            type="range"
                            value={volume}
                            onChange={handleVolumeChange}
                            min="0"
                            max="100"
                            className="volume-slider"
                        />
                    )}
                </div>
            </div>
            <p className="now-playing">{currentSong?.name || 'No song selected'}</p>
        </div>
    );
};

export default PlayerControls;
