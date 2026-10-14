export const SITE_NAME = 'BLG Transporte Internacional';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://blg-transporte-internacional.manuelquartinoarocen.chatgpt.site'
).replace(/\/$/, '');

export const SITE_DESCRIPTION =
  'Transporte terrestre nacional e internacional desde Paraguay. Carga general, refrigerada, especial y puerta a puerta con cobertura regional.';

export const COMPANY_ADDRESS = {
  streetAddress: 'Acosta Ñu entre Juan S. I. Bogarín y Emiliano R. Fernández',
  addressLocality: 'Villa Elisa',
  addressRegion: 'Central',
  addressCountry: 'PY',
};
