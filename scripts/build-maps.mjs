import fs from 'node:fs';
import { geoArea, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const [paraguayFile, worldFile] = process.argv.slice(2);
if (!paraguayFile || !worldFile) throw new Error('Provide Paraguay GeoJSON and world-atlas TopoJSON paths.');
const national = JSON.parse(fs.readFileSync(paraguayFile, 'utf8'));
const names = ['Asunción','Concepción','San Pedro','Cordillera','Guairá','Caaguazú','Caazapá','Itapúa','Misiones','Paraguarí','Alto Paraná','Central','Ñeembucú','Amambay','Canindeyú','Presidente Hayes','Boquerón','Alto Paraguay'];
national.features.forEach((f,i) => {
  f.properties.name = names[i];
  if (geoArea(f) > Math.PI * 2) {
    const polygons = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    polygons.forEach(p => p.forEach(ring => ring.reverse()));
  }
});
const topology = JSON.parse(fs.readFileSync(worldFile,'utf8'));
const world = feature(topology, topology.objects.countries);
const countryNames = {'032':'Argentina','068':'Bolivia','076':'Brasil','152':'Chile','170':'Colombia','218':'Ecuador','238':'Islas Malvinas / Falkland Islands','328':'Guyana','600':'Paraguay','604':'Perú','740':'Surinam','858':'Uruguay','862':'Venezuela'};
const covered = new Set(['032','068','076','152','600','858']);
const countries = world.features.filter(f => countryNames[f.id]);
const south = {type:'FeatureCollection',features:countries};
function project(collection, mode) {
  const projection = geoMercator().fitExtent([[38,22],[662,598]], collection);
  const path = geoPath(projection).digits(1);
  return collection.features.map(f => ({
    id: mode === 'national' ? f.properties.shapeISO : f.id,
    name: mode === 'national' ? f.properties.name : countryNames[f.id],
    path: path(f),
    center: path.centroid(f).map(n => +n.toFixed(1)),
    covered: mode === 'national' || covered.has(f.id),
  }));
}
const data = {national:project(national,'national'),international:project(south,'international')};
if(data.national.length!==18 || data.international.filter(x=>x.covered).length!==6) throw new Error('Unexpected geographic coverage');
fs.mkdirSync('app/data',{recursive:true});
fs.writeFileSync('app/data/coverage-maps.json', JSON.stringify(data));
console.log('Generated 18 administrative regions and 6 covered countries.');
