/*global alert:false */
/*global THREE:false */
/*global window:false */
/*global $:false */
/*global document:false */
/*global Stats:false*/

var renderer, scene, camera, sphere, aspect, controls, stats, container, mirrorSphereCamera;

function addSphere(geometry, material)
{
	sphere = new THREE.Mesh(geometry, material);
	sphere.position.x += Math.random()*20-10;
	sphere.position.y += Math.random()*20-10;
	sphere.position.z += Math.random()*20-10;
	scene.add(sphere);
}

function webGLStart()
{
	renderer = new THREE.WebGLRenderer();
	
	aspect = window.innerWidth/window.innerHeight;
	camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 1000);
	camera.position.z=3;
	
	scene = new THREE.Scene();
	scene.add(camera);
	renderer.setSize(window.innerWidth, window.innerHeight);
	$("body").append(renderer.domElement);
	
	var geometry = new THREE.SphereGeometry(1, 30, 15);
	var mirror = new THREE.Mirror(renderer, camera);
	var material = new THREE.MeshPhongMaterial();
	
	for(var i = 0; i < 500; i++)
	{
		addSphere(geometry, material);
	}
	
	var pointLight = new THREE.PointLight();
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

function onWindowResize()
{
	aspect = window.innerWidth/window.innerHeight;
	camera.aspect = aspect;
	alert("asdf");
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate()
{
	controls.update();

	window.requestAnimationFrame(animate);
	renderer.render(scene, camera);
	stats.update();
}