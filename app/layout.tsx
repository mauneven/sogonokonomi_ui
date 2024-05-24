import '@mantine/core/styles.css';

import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import Navbar from '@/components/navigation/navbar/Navbar';

export const metadata = {
  title: 'Sogo no konomi',
  description: 'Sogo no konomi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider>
          <Navbar />
          <Container fluid>{children}</Container>
        </MantineProvider>
      </body>
    </html>
  );
}