import '~/styles/style.scss';
import DataProvider from '~/redux/store';
import RefreshTokenHandle from './refreshTokenHandle';

function App({ Component, pageProps }) {
    return (
        <DataProvider>
            <Component {...pageProps} />
            <RefreshTokenHandle />
        </DataProvider>
    );
}

export default App;
