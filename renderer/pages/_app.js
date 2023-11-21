import './styles.css';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from './ErrorBoundary';

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ErrorBoundary fallback={<p>Something went wrong...</p>}>
        <Component {...pageProps} />;
      </ErrorBoundary>
    </RecoilRoot>
  );
}
