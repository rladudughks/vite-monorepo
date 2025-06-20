import { Button, DesignSystemProvider } from '@monorepo/design-system';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <CookiesProvider>
        <DesignSystemProvider mode="light" defaultColorScheme="light">
          <Button>TEST</Button>
        </DesignSystemProvider>
      </CookiesProvider>
    </HelmetProvider>
  );
}
