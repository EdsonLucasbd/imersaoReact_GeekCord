export default function GlobalStyle() {
  return (
    <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
      scrollbar-width: auto;
      scrollbar-color: #774686 #272932;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }
    *::-webkit-scrollbar {
      width: 8px;
      border-radius: 6px;
      background: #272932;
    }
    *::-webkit-scrollbar-thumb {
      background-color: #774686;
      border-radius: 6px;
    }
    /* App fit Height */ 
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }
    /* ./App fit Height */ 
    `}</style>
  );
}