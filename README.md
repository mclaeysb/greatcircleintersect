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

// var point0 = [23, -51];
// var point1 = [0, 74];
// var point2 = [103, -13];
// var point3 = [1, 51];

var gci = greatcircleintersect(point0, point1, point2, point3, true);

// gci = [ 11.156998734005295, 50.66432074788117 ]
```

You can set a boolean variable to specify the intersection should be computed in the sphere (default) or in the Cartesian space of the coordinates.

In the first case, the inputs are expected in WGS84 coordinates, in degrees.

# Credits

The geodesic variant is based on the very useful website of [Movable Type Scripts](http://www.movable-type.co.uk/scripts/latlong-vectors.html#intersection)
