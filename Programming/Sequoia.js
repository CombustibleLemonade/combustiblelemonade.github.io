/*global alert:false */
/*global THREE:false */
/*global window:false */
/*global $:false */
/*global document:false */
/*global Stats:false*/

var renderer, scene, camera, sphere, aspect, controls, stats, container, mirrorSphereCamera;

function addSphere(geometry, material) {
	"use strict";
	sphere = new THREE.Mesh(geometry, material);
	sphere.position.x += Math.random() * 20 - 10;
	sphere.position.y += Math.random() * 20 - 10;
	sphere.position.z += Math.random() * 20 - 10;
	scene.add(sphere);
}

function animate() {
	"use strict";

	controls.update();

	window.requestAnimationFrame(animate);
	renderer.render(scene, camera);
	stats.update();
}

function webGLStart() {
	"use strict";

	var geometry, mirror, material, pointLight;

	renderer = new THREE.WebGLRenderer();
	
	aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 1000);
	camera.position.z = 3;
	
	scene = new THREE.Scene();
	scene.add(camera);
	renderer.setSize(window.innerWidth, window.innerHeight);
	$("body").append(renderer.domElement);
	
	geometry = new THREE.SphereGeometry(1, 30, 15);
	mirror = new THREE.Mirror(renderer, camera);
	material = new THREE.MeshPhongMaterial();
	
	sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
	
	pointLight = new THREE.PointLight();
	pointLight.intensity = 1.0;
	pointLight.position.x = 5;
	pointLight.position.z = 5;
	
	controls = new THREE.TrackballControls(camera, window.domElement);

	scene.add(pointLight);
	
	container = $("#container")[0];
	
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild(stats.domElement);
	
	animate();
}

function onWindowResize() {
	"use strict";

	aspect = window.innerWidth / window.innerHeight;
	camera.aspect = aspect;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
