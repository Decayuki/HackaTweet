import { Provider } from 'react-redux';
import { store } from '../Redux/store'; // ← Store unique configuré ici
import '../styles/globals.css'; // ← À adapter si tu as un fichier global CSS

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;