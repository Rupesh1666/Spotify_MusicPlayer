import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #1e1e1e;
    color: white;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
  }

  input, button {
    font-family: inherit;
  }

  @media (max-width: 600px) {
    .player-controls {
      flex-direction: column;
    }

    .song-list div {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default GlobalStyles;
