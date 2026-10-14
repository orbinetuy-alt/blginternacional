# Despliegue en cPanel

Dominio canónico: `https://www.blgtransporte.com`

## Requisitos previos

1. Crear o asignar el dominio `www.blgtransporte.com` en cPanel.
2. Confirmar que `blgtransporte.com` y `www.blgtransporte.com` apuntan al hosting.
3. Activar AutoSSL y verificar que ambos nombres tengan certificado válido.

## Compilar

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://www.blgtransporte.com npm run build
```

La compilación genera `out/`. El ZIP de publicación debe contener los archivos que están **dentro** de `out/`, no la carpeta `out` como nivel adicional.

## Subir

1. Abrir el Administrador de archivos de cPanel.
2. Entrar al document root del dominio, normalmente `public_html/`.
3. Retirar o respaldar la página provisional del hosting.
4. Subir `blgtransporte-cpanel.zip` y extraerlo directamente en ese directorio.
5. Confirmar que exista `public_html/index.html` y no `public_html/out/index.html`.

El archivo `.htaccess` incluido fuerza HTTPS, redirige la versión sin `www`, configura la página 404, compresión y caché de recursos.

## Comprobaciones posteriores

- Abrir `https://www.blgtransporte.com` y recorrer la web en escritorio y móvil.
- Confirmar `https://www.blgtransporte.com/robots.txt`.
- Confirmar `https://www.blgtransporte.com/sitemap.xml`.
- Añadir el dominio a Google Search Console y enviar `/sitemap.xml`.
