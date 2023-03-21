import * as THREE from "three";

function createLine(start, end) {
  let lineObject = new THREE.Object3D();
  var points = [];
  points.push(start);
  points.push(end);

  let lineWidth = 0.01;
  let lineSegment = 8;

  var tubing = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points),
    20,
    lineWidth,
    lineSegment
    // true
  );

  var material = new THREE.MeshBasicMaterial({ color: 0x4154f1 });
  var mesh = new THREE.Mesh(tubing, material);
  mesh.position.set(-start.x, -start.y, -start.z);
  lineObject.add(mesh);
  const cgeometry = new THREE.ConeGeometry(
    lineWidth * 3,
    lineWidth * 10,
    lineSegment
  );
  const cmaterial = new THREE.MeshBasicMaterial({ color: 0x4154f1 });
  const cone = new THREE.Mesh(cgeometry, cmaterial);

  // cone.translateY(-1);
  cone.position.set(end.x - start.x, end.y - start.y, end.z - start.z);

  cone.lookAt(0, 0, 0);
  cone.rotateX(-Math.PI / 2);

  lineObject.add(cone);
  lineObject.position.set(start.x, start.y, start.z);
  lineObject.name = "lineObject";
  return lineObject;
}

export { createLine };
