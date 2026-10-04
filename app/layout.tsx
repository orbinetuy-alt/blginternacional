import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'BLG — Transporte Internacional',
  description: 'Transporte terrestre nacional e internacional. BLG conecta Paraguay con los mercados de la región.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
