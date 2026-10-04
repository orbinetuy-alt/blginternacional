# Coverage cartography

Paraguay ADM1: geoBoundaries gbOpen, PRY-ADM1-63826900, boundaries representing 2012, 18 units (17 departments and Asunción). Source: DGEEC. License: CC BY 4.0. Simplified and projected to SVG coordinates for this site.
https://www.geoboundaries.org/api/current/gbOpen/PRY/ADM1/
https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/PRY/ADM1/geoBoundaries-PRY-ADM1_simplified.geojson

South America: world-atlas 2, countries-110m, based on Natural Earth public-domain geography. Package: ISC. Selected South American country features and projected to SVG coordinates.
https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
https://github.com/topojson/world-atlas
https://www.naturalearthdata.com/about/terms-of-use/

Regenerate with `node scripts/build-maps.mjs /path/paraguay.geojson /path/countries-110m.json`.
Coverage comes from BLG's existing site and client confirmation, not the geographic datasets. No routes, depots, delivery times or borders beyond the source data have been inferred.
