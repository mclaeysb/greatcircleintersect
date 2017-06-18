module.exports = function(point0, point1, point2, point3, useGeodesic) {

  if (equalArrays(point0, point1) | equalArrays(point2, point3)) throw new Error("The input points must be distinct");
  if (equalArrays(point0, opposite(point1)) | equalArrays(point2, opposite(point3))) throw new Error("The input points may not be opposite");
  if (useGeodesic == undefined) useGeodesic = 1;

  if (!useGeodesic) {

    return intersect(point0, point1, point2, point3);

  } else {

    // Process input
    var nvector0 = pt2nv(point0);
    var nvector1 = pt2nv(point1);
    var nvector2 = pt2nv(point2);
    var nvector3 = pt2nv(point3);

    // Compute nvector of great circles
    var nvector01 = crossprod(nvector0, nvector1);
    var nvector23 = crossprod(nvector2, nvector3);

    // compute nvector of intersection
    var nvector4 = crossprod(nvector01, nvector23);

    // Comput intersection cantidate points
    var point4_candidate0 = nv2pt(nvector4);
    var point4_candidate1 = opposite(point4_candidate0);

    // Determine which canditate is the correct one by comparing to the intersection in cartesian space
    var point4_carthesian = intersect(point0, point1, point2, point3);
    var point4;
    if (dist(point4_candidate0, point4_carthesian) < dist(point4_candidate1, point4_carthesian)) {
      point4 = point4_candidate0;
    } else {
      point4 = point4_candidate1;
    }

    return point4;
  }
}

// Point to nvector
var pt2nv = function(pt) {
  pt = pt.map(function(x) { return x / 180 * Math.PI; });
  return [ Math.cos(pt[1]) * Math.cos(pt[0]), Math.cos(pt[1]) * Math.sin(pt[0]), Math.sin(pt[1])]
}

// Nvector to point
var nv2pt = function(nv) {
  return [ Math.atan2(nv[1], nv[0]), Math.atan2(nv[2], Math.sqrt(Math.pow(nv[0],2) + Math.pow(nv[1],2)))].map(function(x) { return x * 180 / Math.PI; })
}
var crossprod = function(nv0, nv1) {
  return [nv0[1] * nv1[2] - nv1[1] * nv0[2], - ( nv0[0] * nv1[2] - nv1[0] * nv0[2] ), nv0[0] * nv1[1] - nv1[0] * nv0[1]];
}

// Distance in cathesian plane
function dist(pt0, pt1) {
  return Math.sqrt(Math.pow((pt1[0] - pt0[0]),2) + Math.pow((pt1[1] - pt0[1]),2));
}

// Normalise coordinates
function normalise(pt) {
  return [(pt[0] + 180).modulo(360) - 180, pt[1]];
}

// Opposite point
function opposite(pt) {
  return normalise([pt[0] + 180, - pt[1]]);
}

// Fix Javascript modulo for negative number. From http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
Number.prototype.modulo = function(n) {
    return ((this%n)+n)%n;
}

// Function to compute where two lines (not segments) intersect. From https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
function intersect(start0, end0, start1, end1) {
  if (equalArrays(start0,start1) || equalArrays(start0,end1) || equalArrays(end0,start1) || equalArrays(end1,start1)) return null;
  var x0 = start0[0],
      y0 = start0[1],
      x1 = end0[0],
      y1 = end0[1],
      x2 = start1[0],
      y2 = start1[1],
      x3 = end1[0],
      y3 = end1[1];
  var denom = (x0 - x1) * (y2 - y3) - (y0 - y1) * (x2 - x3);
  if (denom == 0) return null;
  var x4 = ((x0 * y1 - y0 * x1) * (x2 - x3) - (x0 - x1) * (x2 * y3 - y2 * x3)) / denom;
  var y4 = ((x0 * y1 - y0 * x1) * (y2 - y3) - (y0 - y1) * (x2 * y3 - y2 * x3)) / denom;
  return [x4, y4];
}

// Function to compare Arrays of numbers. From http://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
function equalArrays(array1, array2) {
  // if the other array is a falsy value, return
  if (!array1 || !array2)
      return false;

  // compare lengths - can save a lot of time
  if (array1.length != array2.length)
      return false;

  for (var i = 0, l=array1.length; i < l; i++) {
      // Check if we have nested arrays
      if (array1[i] instanceof Array && array2[i] instanceof Array) {
          // recurse into the nested arrays
          if (!equalArrays(array1[i],array2[i]))
              return false;
      }
      else if (array1[i] != array2[i]) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;
      }
  }
  return true;
}
