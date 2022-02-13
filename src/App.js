// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { createBrowserHistory } from 'history';
import { createContext } from 'react';
import Store from './store';

// ----------------------------------------------------------------------

const hist = createBrowserHistory();


const store = new Store();

const State = {
  store: Store
};

export const Context = createContext({
  store
});


export default function App() {
  return (
    <Context.Provider value={{ store }}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
    </Context.Provider>
  );
}
