# greatcircleintersect

A very simple script to compute the intersection point of two great circles specified using two points. The intersection point is computed either in the Cartesian plane of its coordinates or on a Sphere.

# Usage

Get Node.js, then

```bash
npm install greatcircleintersect
```

and use it like so:

```javascript
var greatcircleintersect = require('greatcircleintersect');

// poly = {type: "Feature", geometry: {type: "Polygon", coordinates: [[[1, 10], [11, 13], ...]]}}

var se = greatcircleintersect(poly);

// isects = {type: "Feature", geometry: {type: "MultiPoint", coordinates: [[5, 8], [7, 3], ...]}}
```

Where `poly` is a GeoJSON Polygon, and `isects` is a GeoJSON MultiPoint.

Finally, you can set a boolean variable to specify if a spatial index should be used to filter for possible intersections.

Together, this may look like so:

# Credits

The geodesic variant is based on the very useful website of [Movable Type Scripts](http://www.movable-type.co.uk/scripts/latlong-vectors.html#intersection)