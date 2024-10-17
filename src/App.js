import React, { useEffect, useState } from 'react';
import './App.css';
import PlayerControls from './components/PlayerControls';
import ColorThief from 'colorthief';
import { ReactComponent as SpotifyLogo } from './assets/spotify-logo.svg';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  // Define the durations for each song
  const songDurations = [
    '3:17', // Duration for the 1st song
    '2:20', // Duration for the 2nd song
    '1:37', // Duration for the 3rd song
    '1:54', // Duration for the 4th song
    '0:55', // Duration for the 5th song
    '2:17', // Duration for the 6th song
    '2:20', // Duration for the 7th song
    '2:58', // Duration for the 8th song
  ];

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('https://cms.samespace.com/items/songs');
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setSongs(data.data);
        } else {
          console.error('Expected data array not found');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    if (songs[currentSongIndex]?.cover) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = `https://cms.samespace.com/assets/${songs[currentSongIndex]?.cover}`;
      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        setBackgroundColor(`rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`);
      };
    }
  }, [currentSongIndex, songs]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSongClick = (index) => {
    // Change the logic to find the index of the song in the original songs array
    const originalSongIndex = songs.findIndex(song => song.id === filteredSongs[index].id);

    if (originalSongIndex === currentSongIndex) {
      setIsPlaying((prev) => !prev); // Toggle play/pause if the same song is clicked
    } else {
      setCurrentSongIndex(originalSongIndex); // Update current song index
      setIsPlaying(true); // Play the selected song
    }
  };

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container" style={{ backgroundColor }}>
      {/* Header Section */}
      <header className="header">
        <div className="logo-section">
          <SpotifyLogo className="spotify-logo" />
          <h1 className="spotify-title">Spotify</h1>
        </div>
        <div className="header-links">
          <span className="header-link">For You</span>
          <span className="header-link">Top Tracks</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="left-section">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />

          <div className="song-list">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className={`song-item ${index === currentSongIndex ? 'active' : ''}`}
                onClick={() => handleSongClick(index)}
              >
                <div className="song-info">
                  <img
                    src={`https://cms.samespace.com/assets/${song.cover}`}
                    alt={`${song.name} cover`}
                    className="song-cover"
                  />
                  <div>
                    <h2>{song.name}</h2>
                    <p>{song.artist}</p>
                  </div>
                </div>
                <span className="song-duration">{songDurations[index]}</span> {/* Display duration */}
              </div>
            ))}
          </div>
        </div>

        <div className="right-section">
          <div className="playback-section">
            <img
              src={`https://cms.samespace.com/assets/${songs[currentSongIndex]?.cover}`}
              alt="Album cover"
              className="album-cover"
            />
          </div>

          <PlayerControls
            currentSong={songs[currentSongIndex]}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            nextSong={() => setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length)}
            previousSong={() => setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
