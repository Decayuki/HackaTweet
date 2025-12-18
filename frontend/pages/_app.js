import { Provider } from 'react-redux';
import { store } from '../Redux/store'; 

// Import du store
// Provider permet de partager le store à tous les composants
//
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;