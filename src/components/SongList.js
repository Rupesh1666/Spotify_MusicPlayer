import React from 'react';

const SongList = ({ songs, currentSong, setCurrentSong, setIsPlaying }) => {
    return (
        <div className="song-list">
            {songs.length > 0 ? (
                songs.map((song) => (
                    <div
                        key={song.id}
                        className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
                        onClick={() => {
                            setCurrentSong(song);
                            setIsPlaying(true);
                        }}
                    >
                        <img
                            src={`https://cms.samespace.com/assets/${song.cover}`}
                            alt={song.title}
                            className="song-cover"
                        />
                        <div className="song-details">
                            <div className="song-title">{song.title}</div>
                            <div className="song-artist">{song.artist}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No songs available</p>
            )}
        </div>
    );
};

export default SongList;
