import { ThemeProvider } from 'styled-components';
import { useState } from 'react';

import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

export function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>asdfasdf</div>

      <GlobalStyle />
    </ThemeProvider>
  )
}

