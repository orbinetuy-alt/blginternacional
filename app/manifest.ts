import type { MetadataRoute } from 'next';

import { SITE_DESCRIPTION, SITE_NAME } from './site-config';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'BLG Transporte',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#071629',
    theme_color: '#071629',
    lang: 'es-PY',
    icons: [
      {
        src: '/images/blg-logo.png',
        sizes: '500x258',
        type: 'image/png',
      },
    ],
  };
}
