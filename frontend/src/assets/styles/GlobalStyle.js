import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => (props.bg ? props.bg : 'white')};
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration:none;
    // color: black;
  }
  // a:hover {
  //   text-decoration:none;
  //   color: blue;
  // }
`;

export default GlobalStyle;
