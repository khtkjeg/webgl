/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	 var scene = __webpack_require__(1);

	 scene.init();


	 // var e = require('./latlon/entry');
	 // e.init();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(OBC, WF, POLL) {

	    var camera, scene, renderer, controls, light;
	    var earthMesh, cloudMesh, windMesh;
	    var windCanvas;

	    function init() {

	        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
	        camera.position.z = 260;

	        scene = new THREE.Scene();

	        light = new THREE.PointLight(0xffffff, 1);
	        scene.add(light);

	        var light2 = new THREE.AmbientLight(0x333333);
	        scene.add(light2);

	        var loader = new THREE.TextureLoader();


	        WF.init(function(canvas) {

	            var path = "frontside/img/MilkyWay/";
	            var format = '.jpg';
	            var urls = [
	                path + 'px' + format, path + 'nx' + format,
	                path + 'py' + format, path + 'ny' + format,
	                path + 'pz' + format, path + 'nz' + format
	            ];
	            var textureCube = THREE.ImageUtils.loadTextureCube(urls, THREE.CubeRefractionMapping);

	            var shader = THREE.ShaderLib["cube"];
	            shader.uniforms["tCube"].value = textureCube;

	            var skyMtl = new THREE.ShaderMaterial({

	                fragmentShader: shader.fragmentShader,
	                vertexShader: shader.vertexShader,
	                uniforms: shader.uniforms,
	                depthWrite: false,
	                side: THREE.BackSide

	            });

	            var skyMesh = new THREE.Mesh(new THREE.BoxGeometry(2000, 2000, 2000), skyMtl);
	            scene.add(skyMesh);



	            ////////////////////////////////////////////////////////////////////////////////////


	            var earthMtl = new THREE.MeshPhongMaterial({
	                specular: 0x000000,
	                shininess: 0.5,
	                map: THREE.ImageUtils.loadTexture("frontside/img/land_shallow_topo_8192_low.png"),
	                specularMap: THREE.ImageUtils.loadTexture("frontside/img/earth_specular_2048.jpg"),
	                normalMap: THREE.ImageUtils.loadTexture("frontside/img/earth_normal_2048.jpg")
	            });


	            var earthGeo = new THREE.SphereGeometry(100, 30, 30);

	            earthMesh = new THREE.Mesh(earthGeo, earthMtl);

	            earthMesh.rotation.y += Math.PI;
	            earthMesh.rotation.x += Math.PI / 5;


	            scene.add(earthMesh);
	            ////////////////////////////////////////////////////////////////////////////////////


	            POLL.init(scene);

	            ////////////////////////////////////////////////////////////////////////////////////

	            windCanvas = new THREE.Texture(canvas);

	            var windMtl = new THREE.MeshBasicMaterial({
	                map: windCanvas,
	                transparent: true
	            });


	            var windGeo = new THREE.SphereGeometry(105, 30, 30);

	            windMesh = new THREE.Mesh(windGeo, windMtl);

	            windMesh.rotation.y += Math.PI;

	            scene.add(windMesh);


	            ////////////////////////////////////////////////////////////////////////////////////

	            // var cloudMtl = new THREE.MeshPhongMaterial({
	            //     map: THREE.ImageUtils.loadTexture("frontside/img/earth_clouds_2048.png"),
	            //     transparent: true
	            // });


	            // var cloudGeo = new THREE.SphereGeometry(106, 30, 30);


	            // cloudMesh = new THREE.Mesh(cloudGeo, cloudMtl);

	            // cloudMesh.rotation.y += Math.PI;
	            // cloudMesh.rotation.x += Math.PI / 5;

	            // scene.add(cloudMesh);

	            ////////////////////////////////////////////////////////////////////////////////////


	            renderer = new THREE.WebGLRenderer({
	                antialias: true
	            });

	            renderer.setPixelRatio(window.devicePixelRatio);
	            renderer.setSize(window.innerWidth, window.innerHeight);
	            document.body.appendChild(renderer.domElement);
	            renderer.gammaInput = true;
	            renderer.gammaOutput = true;


	            controls = new THREE.OrbitControls(camera, renderer.domElement);
	            controls.minDistance = 200;
	            controls.maxDistance = 400;

	            window.addEventListener('resize', onWindowResize, false);


	            animate();
	        })

	    }


	    function onWindowResize() {

	        camera.aspect = window.innerWidth / window.innerHeight;

	        camera.updateProjectionMatrix();

	        renderer.setSize(window.innerWidth, window.innerHeight);
	    }

	    function animate() {

	        requestAnimationFrame(animate);

	        controls.update();

	        windCanvas.needsUpdate = true;

	        renderer.render(scene, camera);

	        light.position.x = camera.position.x;
	        light.position.y = camera.position.y;
	        light.position.z = camera.position.z;

	      //  earthMesh.rotation.y += 0.0002;
	      //  windMesh.rotation.y += 0.0002;
	      //  cloudMesh.rotation.y += 0.0005;
	    }


	    return {
	        init: init
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */
	/*global THREE, console */

	(function() {

		function OrbitConstraint(object) {

			this.object = object;

			// "target" sets the location of focus, where the object orbits around
			// and where it pans with respect to.
			this.target = new THREE.Vector3();

			// Limits to how far you can dolly in and out ( PerspectiveCamera only )
			this.minDistance = 0;
			this.maxDistance = Infinity;

			// Limits to how far you can zoom in and out ( OrthographicCamera only )
			this.minZoom = 0;
			this.maxZoom = Infinity;

			// How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.
			this.minPolarAngle = 0; // radians
			this.maxPolarAngle = Math.PI; // radians

			// How far you can orbit horizontally, upper and lower limits.
			// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
			this.minAzimuthAngle = -Infinity; // radians
			this.maxAzimuthAngle = Infinity; // radians

			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop
			this.enableDamping = false;
			this.dampingFactor = 0.25;

			////////////
			// internals

			var scope = this;

			var EPS = 0.000001;

			// Current position in spherical coordinate system.
			var theta;
			var phi;

			// Pending changes
			var phiDelta = 0;
			var thetaDelta = 0;
			var scale = 1;
			var panOffset = new THREE.Vector3();
			var zoomChanged = false;

			// API

			this.getPolarAngle = function() {

				return phi;

			};

			this.getAzimuthalAngle = function() {

				return theta;

			};

			this.rotateLeft = function(angle) {

				thetaDelta -= angle;

			};

			this.rotateUp = function(angle) {

				phiDelta -= angle;

			};

			// pass in distance in world space to move left
			this.panLeft = function() {

				var v = new THREE.Vector3();

				return function panLeft(distance) {

					var te = this.object.matrix.elements;

					// get X column of matrix
					v.set(te[0], te[1], te[2]);
					v.multiplyScalar(-distance);

					panOffset.add(v);

				};

			}();

			// pass in distance in world space to move up
			this.panUp = function() {

				var v = new THREE.Vector3();

				return function panUp(distance) {

					var te = this.object.matrix.elements;

					// get Y column of matrix
					v.set(te[4], te[5], te[6]);
					v.multiplyScalar(distance);

					panOffset.add(v);

				};

			}();

			// pass in x,y of change desired in pixel space,
			// right and down are positive
			this.pan = function(deltaX, deltaY, screenWidth, screenHeight) {

				if (scope.object instanceof THREE.PerspectiveCamera) {

					// perspective
					var position = scope.object.position;
					var offset = position.clone().sub(scope.target);
					var targetDistance = offset.length();

					// half of the fov is center to top of screen
					targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);

					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					scope.panLeft(2 * deltaX * targetDistance / screenHeight);
					scope.panUp(2 * deltaY * targetDistance / screenHeight);

				} else if (scope.object instanceof THREE.OrthographicCamera) {

					// orthographic
					scope.panLeft(deltaX * (scope.object.right - scope.object.left) / screenWidth);
					scope.panUp(deltaY * (scope.object.top - scope.object.bottom) / screenHeight);

				} else {

					// camera neither orthographic or perspective
					console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');

				}

			};

			this.dollyIn = function(dollyScale) {

				if (scope.object instanceof THREE.PerspectiveCamera) {

					scale /= dollyScale;

				} else if (scope.object instanceof THREE.OrthographicCamera) {

					scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');

				}

			};

			this.dollyOut = function(dollyScale) {

				if (scope.object instanceof THREE.PerspectiveCamera) {

					scale *= dollyScale;

				} else if (scope.object instanceof THREE.OrthographicCamera) {

					scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');

				}

			};

			this.update = function() {

				var offset = new THREE.Vector3();

				// so camera.up is the orbit axis
				var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
				var quatInverse = quat.clone().inverse();

				var lastPosition = new THREE.Vector3();
				var lastQuaternion = new THREE.Quaternion();

				return function() {

					var position = this.object.position;

					offset.copy(position).sub(this.target);

					// rotate offset to "y-axis-is-up" space
					offset.applyQuaternion(quat);

					// angle from z-axis around y-axis

					theta = Math.atan2(offset.x, offset.z);

					// angle from y-axis

					phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

					theta += thetaDelta;
					phi += phiDelta;

					// restrict theta to be between desired limits
					theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, theta));

					// restrict phi to be between desired limits
					phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

					// restrict phi to be betwee EPS and PI-EPS
					phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

					var radius = offset.length() * scale;

					// restrict radius to be between desired limits
					radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));

					// move target to panned location
					this.target.add(panOffset);

					offset.x = radius * Math.sin(phi) * Math.sin(theta);
					offset.y = radius * Math.cos(phi);
					offset.z = radius * Math.sin(phi) * Math.cos(theta);

					// rotate offset back to "camera-up-vector-is-up" space
					offset.applyQuaternion(quatInverse);

					position.copy(this.target).add(offset);

					this.object.lookAt(this.target);

					if (this.enableDamping === true) {

						thetaDelta *= (1 - this.dampingFactor);
						phiDelta *= (1 - this.dampingFactor);

					} else {

						thetaDelta = 0;
						phiDelta = 0;

					}

					scale = 1;
					panOffset.set(0, 0, 0);

					// update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8

					if (zoomChanged ||
						lastPosition.distanceToSquared(this.object.position) > EPS ||
						8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {

						lastPosition.copy(this.object.position);
						lastQuaternion.copy(this.object.quaternion);
						zoomChanged = false;

						return true;

					}

					return false;

				};

			}();

		};


		// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
		// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
		// supported.
		//
		//    Orbit - left mouse / touch: one finger move
		//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
		//    Pan - right mouse, or arrow keys / touch: three finter swipe

		THREE.OrbitControls = function(object, domElement) {

			var constraint = new OrbitConstraint(object);

			this.domElement = (domElement !== undefined) ? domElement : document;

			// API

			Object.defineProperty(this, 'constraint', {

				get: function() {

					return constraint;

				}

			});

			this.getPolarAngle = function() {

				return constraint.getPolarAngle();

			};

			this.getAzimuthalAngle = function() {

				return constraint.getAzimuthalAngle();

			};


			/*addbyanerki*/
			this.turnLeft = function(angle) {
				return constraint.rotateLeft(angle);
			}
			/*addbyanerki*/
			this.turnRight = function(angle) {
				return constraint.rotateRight(angle);
			}
			/*addbyanerki*/
			this.panMove = function(deltaX, deltaY) {
				return pan(deltaX, deltaY);
			}
			/*addbyanerki*/
			this.zoomIn = function() {
				return constraint.dollyOut(getZoomScale());
			}
			/*addbyanerki*/
			this.zoomOut = function() {
				return constraint.dollyIn(getZoomScale());
			}

			// Set to false to disable this control
			this.enabled = true;

			// center is old, deprecated; use "target" instead
			this.center = this.target;

			// This option actually enables dollying in and out; left as "zoom" for
			// backwards compatibility.
			// Set to false to disable zooming
			this.enableZoom = true;
			this.zoomSpeed = 1.0;

			// Set to false to disable rotating
			this.enableRotate = true;
			this.rotateSpeed = 1.0;

			// Set to false to disable panning
			this.enablePan = true;
			this.keyPanSpeed = 7.0; // pixels moved per arrow key push

			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop
			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

			// Set to false to disable use of the keys
			this.enableKeys = true;

			// The four arrow keys
			this.keys = {
				LEFT: 37,
				UP: 38,
				RIGHT: 39,
				BOTTOM: 40
			};

			// Mouse buttons
			this.mouseButtons = {
				ORBIT: THREE.MOUSE.LEFT,
				ZOOM: THREE.MOUSE.MIDDLE,
				PAN: THREE.MOUSE.RIGHT
			};

			////////////
			// internals

			var scope = this;

			var rotateStart = new THREE.Vector2();
			var rotateEnd = new THREE.Vector2();
			var rotateDelta = new THREE.Vector2();

			var panStart = new THREE.Vector2();
			var panEnd = new THREE.Vector2();
			var panDelta = new THREE.Vector2();

			var dollyStart = new THREE.Vector2();
			var dollyEnd = new THREE.Vector2();
			var dollyDelta = new THREE.Vector2();

			var STATE = {
				NONE: -1,
				ROTATE: 0,
				DOLLY: 1,
				PAN: 2,
				TOUCH_ROTATE: 3,
				TOUCH_DOLLY: 4,
				TOUCH_PAN: 5
			};

			var state = STATE.NONE;

			// for reset

			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom;

			// events

			var changeEvent = {
				type: 'change'
			};
			var startEvent = {
				type: 'start'
			};
			var endEvent = {
				type: 'end'
			};

			// pass in x,y of change desired in pixel space,
			// right and down are positive

			function pan(deltaX, deltaY) {

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				constraint.pan(deltaX, deltaY, element.clientWidth, element.clientHeight);

			}

			this.update = function() {

				if (this.autoRotate && state === STATE.NONE) {

					constraint.rotateLeft(getAutoRotationAngle());

				}

				if (constraint.update() === true) {

					this.dispatchEvent(changeEvent);

				}

			};

			this.reset = function() {

				state = STATE.NONE;

				this.target.copy(this.target0);
				this.object.position.copy(this.position0);
				this.object.zoom = this.zoom0;

				this.object.updateProjectionMatrix();
				this.dispatchEvent(changeEvent);

				this.update();

			};

			function getAutoRotationAngle() {

				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

			}

			function getZoomScale() {

				return Math.pow(0.95, scope.zoomSpeed);

			}

			function onMouseDown(event) {

				if (scope.enabled === false) return;

				event.preventDefault();

				if (event.button === scope.mouseButtons.ORBIT) {

					if (scope.enableRotate === false) return;

					state = STATE.ROTATE;

					rotateStart.set(event.clientX, event.clientY);

				} else if (event.button === scope.mouseButtons.ZOOM) {

					if (scope.enableZoom === false) return;

					state = STATE.DOLLY;

					dollyStart.set(event.clientX, event.clientY);

				} else if (event.button === scope.mouseButtons.PAN) {

					if (scope.enablePan === false) return;

					state = STATE.PAN;

					panStart.set(event.clientX, event.clientY);

				}

				if (state !== STATE.NONE) {

					document.addEventListener('mousemove', onMouseMove, false);
					document.addEventListener('mouseup', onMouseUp, false);
					scope.dispatchEvent(startEvent);

				}

			}

			function onMouseMove(event) {

				if (scope.enabled === false) return;

				event.preventDefault();

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				if (state === STATE.ROTATE) {

					if (scope.enableRotate === false) return;

					rotateEnd.set(event.clientX, event.clientY);
					rotateDelta.subVectors(rotateEnd, rotateStart);

					// rotating across whole screen goes 360 degrees around
					constraint.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

					// rotating up and down along whole screen attempts to go 360, but limited to 180
					constraint.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

					rotateStart.copy(rotateEnd);

				} else if (state === STATE.DOLLY) {

					if (scope.enableZoom === false) return;

					dollyEnd.set(event.clientX, event.clientY);
					dollyDelta.subVectors(dollyEnd, dollyStart);

					if (dollyDelta.y > 0) {

						constraint.dollyIn(getZoomScale());

					} else if (dollyDelta.y < 0) {

						constraint.dollyOut(getZoomScale());

					}

					dollyStart.copy(dollyEnd);

				} else if (state === STATE.PAN) {

					if (scope.enablePan === false) return;

					panEnd.set(event.clientX, event.clientY);
					panDelta.subVectors(panEnd, panStart);

					pan(panDelta.x, panDelta.y);

					panStart.copy(panEnd);

				}

				if (state !== STATE.NONE) scope.update();

			}

			function onMouseUp( /* event */ ) {

				if (scope.enabled === false) return;

				document.removeEventListener('mousemove', onMouseMove, false);
				document.removeEventListener('mouseup', onMouseUp, false);
				scope.dispatchEvent(endEvent);
				state = STATE.NONE;

			}

			function onMouseWheel(event) {

				if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE) return;

				event.preventDefault();
				event.stopPropagation();

				var delta = 0;

				if (event.wheelDelta !== undefined) {

					// WebKit / Opera / Explorer 9

					delta = event.wheelDelta;

				} else if (event.detail !== undefined) {

					// Firefox

					delta = -event.detail;

				}

				if (delta > 0) {

					constraint.dollyOut(getZoomScale());

				} else if (delta < 0) {

					constraint.dollyIn(getZoomScale());

				}

				scope.update();
				scope.dispatchEvent(startEvent);
				scope.dispatchEvent(endEvent);

			}

			function onKeyDown(event) {

				if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;

				switch (event.keyCode) {

					case scope.keys.UP:
						pan(0, scope.keyPanSpeed);
						scope.update();
						break;

					case scope.keys.BOTTOM:
						pan(0, -scope.keyPanSpeed);
						scope.update();
						break;

					case scope.keys.LEFT:
						pan(scope.keyPanSpeed, 0);
						scope.update();
						break;

					case scope.keys.RIGHT:
						pan(-scope.keyPanSpeed, 0);
						scope.update();
						break;

				}

			}

			function touchstart(event) {

				if (scope.enabled === false) return;

				switch (event.touches.length) {

					case 1: // one-fingered touch: rotate

						if (scope.enableRotate === false) return;

						state = STATE.TOUCH_ROTATE;

						rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
						break;

					case 2: // two-fingered touch: dolly

						if (scope.enableZoom === false) return;

						state = STATE.TOUCH_DOLLY;

						var dx = event.touches[0].pageX - event.touches[1].pageX;
						var dy = event.touches[0].pageY - event.touches[1].pageY;
						var distance = Math.sqrt(dx * dx + dy * dy);
						dollyStart.set(0, distance);
						break;

					case 3: // three-fingered touch: pan

						if (scope.enablePan === false) return;

						state = STATE.TOUCH_PAN;

						panStart.set(event.touches[0].pageX, event.touches[0].pageY);
						break;

					default:

						state = STATE.NONE;

				}

				if (state !== STATE.NONE) scope.dispatchEvent(startEvent);

			}

			function touchmove(event) {

				if (scope.enabled === false) return;

				event.preventDefault();
				event.stopPropagation();

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				switch (event.touches.length) {

					case 1: // one-fingered touch: rotate

						if (scope.enableRotate === false) return;
						if (state !== STATE.TOUCH_ROTATE) return;

						rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
						rotateDelta.subVectors(rotateEnd, rotateStart);

						// rotating across whole screen goes 360 degrees around
						constraint.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
						// rotating up and down along whole screen attempts to go 360, but limited to 180
						constraint.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

						rotateStart.copy(rotateEnd);

						scope.update();
						break;

					case 2: // two-fingered touch: dolly

						if (scope.enableZoom === false) return;
						if (state !== STATE.TOUCH_DOLLY) return;

						var dx = event.touches[0].pageX - event.touches[1].pageX;
						var dy = event.touches[0].pageY - event.touches[1].pageY;
						var distance = Math.sqrt(dx * dx + dy * dy);

						dollyEnd.set(0, distance);
						dollyDelta.subVectors(dollyEnd, dollyStart);

						if (dollyDelta.y > 0) {

							constraint.dollyOut(getZoomScale());

						} else if (dollyDelta.y < 0) {

							constraint.dollyIn(getZoomScale());

						}

						dollyStart.copy(dollyEnd);

						scope.update();
						break;

					case 3: // three-fingered touch: pan

						if (scope.enablePan === false) return;
						if (state !== STATE.TOUCH_PAN) return;

						panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
						panDelta.subVectors(panEnd, panStart);

						pan(panDelta.x, panDelta.y);

						panStart.copy(panEnd);

						scope.update();
						break;

					default:

						state = STATE.NONE;

				}

			}

			function touchend( /* event */ ) {

				if (scope.enabled === false) return;

				scope.dispatchEvent(endEvent);
				state = STATE.NONE;

			}

			function contextmenu(event) {

				event.preventDefault();

			}

			this.dispose = function() {

				this.domElement.removeEventListener('contextmenu', contextmenu, false);
				this.domElement.removeEventListener('mousedown', onMouseDown, false);
				this.domElement.removeEventListener('mousewheel', onMouseWheel, false);
				this.domElement.removeEventListener('MozMousePixelScroll', onMouseWheel, false); // firefox

				this.domElement.removeEventListener('touchstart', touchstart, false);
				this.domElement.removeEventListener('touchend', touchend, false);
				this.domElement.removeEventListener('touchmove', touchmove, false);

				document.removeEventListener('mousemove', onMouseMove, false);
				document.removeEventListener('mouseup', onMouseUp, false);

				window.removeEventListener('keydown', onKeyDown, false);

			}

			this.domElement.addEventListener('contextmenu', contextmenu, false);

			this.domElement.addEventListener('mousedown', onMouseDown, false);
			this.domElement.addEventListener('mousewheel', onMouseWheel, false);
			this.domElement.addEventListener('MozMousePixelScroll', onMouseWheel, false); // firefox

			this.domElement.addEventListener('touchstart', touchstart, false);
			this.domElement.addEventListener('touchend', touchend, false);
			this.domElement.addEventListener('touchmove', touchmove, false);

			window.addEventListener('keydown', onKeyDown, false);

			// force an update at start
			this.update();

		};

		THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
		THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

		Object.defineProperties(THREE.OrbitControls.prototype, {

			object: {

				get: function() {

					return this.constraint.object;

				}

			},

			target: {

				get: function() {

					return this.constraint.target;

				},

				set: function(value) {

					console.warn('THREE.OrbitControls: target is now immutable. Use target.set() instead.');
					this.constraint.target.copy(value);

				}

			},

			minDistance: {

				get: function() {

					return this.constraint.minDistance;

				},

				set: function(value) {

					this.constraint.minDistance = value;

				}

			},

			maxDistance: {

				get: function() {

					return this.constraint.maxDistance;

				},

				set: function(value) {

					this.constraint.maxDistance = value;

				}

			},

			minZoom: {

				get: function() {

					return this.constraint.minZoom;

				},

				set: function(value) {

					this.constraint.minZoom = value;

				}

			},

			maxZoom: {

				get: function() {

					return this.constraint.maxZoom;

				},

				set: function(value) {

					this.constraint.maxZoom = value;

				}

			},

			minPolarAngle: {

				get: function() {

					return this.constraint.minPolarAngle;

				},

				set: function(value) {

					this.constraint.minPolarAngle = value;

				}

			},

			maxPolarAngle: {

				get: function() {

					return this.constraint.maxPolarAngle;

				},

				set: function(value) {

					this.constraint.maxPolarAngle = value;

				}

			},

			minAzimuthAngle: {

				get: function() {

					return this.constraint.minAzimuthAngle;

				},

				set: function(value) {

					this.constraint.minAzimuthAngle = value;

				}

			},

			maxAzimuthAngle: {

				get: function() {

					return this.constraint.maxAzimuthAngle;

				},

				set: function(value) {

					this.constraint.maxAzimuthAngle = value;

				}

			},

			enableDamping: {

				get: function() {

					return this.constraint.enableDamping;

				},

				set: function(value) {

					this.constraint.enableDamping = value;

				}

			},

			dampingFactor: {

				get: function() {

					return this.constraint.dampingFactor;

				},

				set: function(value) {

					this.constraint.dampingFactor = value;

				}

			},

			// backward compatibility

			noZoom: {

				get: function() {

					console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
					return !this.enableZoom;

				},

				set: function(value) {

					console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
					this.enableZoom = !value;

				}

			},

			noRotate: {

				get: function() {

					console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
					return !this.enableRotate;

				},

				set: function(value) {

					console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
					this.enableRotate = !value;

				}

			},

			noPan: {

				get: function() {

					console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
					return !this.enablePan;

				},

				set: function(value) {

					console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
					this.enablePan = !value;

				}

			},

			noKeys: {

				get: function() {

					console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
					return !this.enableKeys;

				},

				set: function(value) {

					console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
					this.enableKeys = !value;

				}

			},

			staticMoving: {

				get: function() {

					console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
					return !this.constraint.enableDamping;

				},

				set: function(value) {

					console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
					this.constraint.enableDamping = !value;

				}

			},

			dynamicDampingFactor: {

				get: function() {

					console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
					return this.constraint.dampingFactor;

				},

				set: function(value) {

					console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
					this.constraint.dampingFactor = value;

				}

			}

		});

	}());

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(W) {

	    function init(callback) {

	        $.getJSON('data/fgs1.json', function(json) {

	            var canvas = document.createElement('canvas');


	            var width = canvas.width = 4096;
	            var height = canvas.height = 2048;

	            var windy = new W.Windy({
	                canvas: canvas,
	                data: json
	            });


	            var extent = {
	                xmax: 180,
	                xmin: -180,
	                ymax: 77.55943984614527,
	                ymin: -46.74495719499965
	            };

	            setTimeout(function() {
	                windy.start(
	                    [
	                        [0, 0],
	                        [width, height]
	                    ],
	                    4096,
	                    2048, [
	                        [extent.xmin, extent.ymin],
	                        [extent.xmax, extent.ymax]
	                    ]
	                );
	            }, 300);



	            callback(canvas);

	        })
	    }



	    return {

	        init: init
	    }

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	    /*  Global class for simulating the movement of particle through a 1km wind grid

	    credit: All the credit for this work goes to: https://github.com/cambecc for creating the repo:
	      https://github.com/cambecc/earth. The majority of this code is directly take nfrom there, since its awesome.

	    This class takes a canvas element and an array of data (1km GFS from http://www.emc.ncep.noaa.gov/index.php?branch=GFS)
	    and then uses a mercator (forward/reverse) projection to correctly map wind vectors in "map space".

	    The "start" method takes the bounds of the map at its current extent and starts the whole gridding,
	    interpolation and animation process.
	*/

	    var Windy = function(params) {
	        var VELOCITY_SCALE = 1 / 70000; // scale for wind velocity (completely arbitrary--this value looks nice)
	        var INTENSITY_SCALE_STEP = 10; // step size of particle intensity color scale
	        var MAX_WIND_INTENSITY = 40; // wind velocity at which particle intensity is maximum (m/s)
	        var MAX_PARTICLE_AGE = 100; // max number of frames a particle is drawn before regeneration
	        var PARTICLE_LINE_WIDTH = 0.8; // line width of a drawn particle
	        var PARTICLE_MULTIPLIER = 8; // particle count scalar (completely arbitrary--this values looks nice)
	        var PARTICLE_REDUCTION = 0.75; // reduce particle count to this much of normal for mobile devices
	        var FRAME_RATE = 20; // desired milliseconds per frame
	        var BOUNDARY = 0.45;

	        var NULL_WIND_VECTOR = [NaN, NaN, null]; // singleton for no wind in the form: [u, v, magnitude]
	        var TRANSPARENT_BLACK = [255, 0, 0, 0];

	        var τ = 2 * Math.PI;
	        var H = Math.pow(10, -5.2);

	        // interpolation for vectors like wind (u,v,m)
	        var bilinearInterpolateVector = function(x, y, g00, g10, g01, g11) {
	            var rx = (1 - x);
	            var ry = (1 - y);
	            var a = rx * ry,
	                b = x * ry,
	                c = rx * y,
	                d = x * y;
	            var u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d;
	            var v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d;
	            return [u, v, Math.sqrt(u * u + v * v)];
	        };


	        var createWindBuilder = function(uComp, vComp) {
	            var uData = uComp.data,
	                vData = vComp.data;
	            return {
	                header: uComp.header,
	                //recipe: recipeFor("wind-" + uComp.header.surface1Value),
	                data: function(i) {
	                    return [uData[i], vData[i]];
	                },
	                interpolate: bilinearInterpolateVector
	            }
	        };

	        var createBuilder = function(data) {
	            var uComp = null,
	                vComp = null,
	                scalar = null;

	            data.forEach(function(record) {
	                switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
	                    case "2,2":
	                        uComp = record;
	                        break;
	                    case "2,3":
	                        vComp = record;
	                        break;
	                    default:
	                        scalar = record;
	                }
	            });

	            return createWindBuilder(uComp, vComp);
	        };

	        var buildGrid = function(data, callback) {

	            var builder = createBuilder(data);

	            var header = builder.header;
	            var λ0 = header.lo1, //0
	                φ0 = header.la1; //90 the grid's origin (e.g., 0.0E, 90.0N)
	            var Δλ = header.dx, //1
	                Δφ = header.dy; //1 distance between grid points (e.g., 2.5 deg lon, 2.5 deg lat)
	            var ni = header.nx, //360
	                nj = header.ny; //181 number of grid points W-E and N-S (e.g., 144 x 73)
	            var date = new Date(header.refTime);
	            date.setHours(date.getHours() + header.forecastTime);

	            // Scan mode 0 assumed. Longitude increases from λ0, and latitude decreases from φ0.
	            // http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
	            var grid = [],
	                p = 0;
	            var isContinuous = Math.floor(ni * Δλ) >= 360;
	            for (var j = 0; j < nj; j++) {
	                var row = [];
	                for (var i = 0; i < ni; i++, p++) {
	                    row[i] = builder.data(p);
	                }
	                if (isContinuous) {
	                    // For wrapped grids, duplicate first column as last column to simplify interpolation logic
	                    row.push(row[0]);
	                }
	                grid[j] = row;
	            }
	            //把数据放到grid中，grid[纬度0-180][经度0-360)，grid是封装在内部的，外部只暴露插值方法




	            function interpolate(λ, φ) { //输入经纬度
	                var i = floorMod(λ - λ0, 360) / Δλ; // calculate longitude index in wrapped range [0, 360)
	                var j = (φ0 - φ) / Δφ; // calculate latitude index in direction +90 to -90 |||| 0——180？

	                var fi = Math.floor(i), //经度
	                    ci = fi + 1; //经度+1
	                var fj = Math.floor(j), //纬度
	                    cj = fj + 1; //纬度+1

	                var row;
	                if ((row = grid[fj])) {
	                    var g00 = row[fi];
	                    var g10 = row[ci];
	                    if (isValue(g00) && isValue(g10) && (row = grid[cj])) {
	                        var g01 = row[fi];
	                        var g11 = row[ci];
	                        if (isValue(g01) && isValue(g11)) {
	                            // 通过grid查找4个临近点值
	                            // All four points found, so interpolate the value.
	                            //因为一格是1，所以减去整数部分，通过小数部分直接做双线性插值
	                            return builder.interpolate(i - fi, j - fj, g00, g10, g01, g11);
	                        }
	                    }
	                }
	                return null;
	            }
	            callback({
	                date: date,
	                interpolate: interpolate
	            });
	        };



	        /**
	         * @returns {Boolean} true if the specified value is not null and not undefined.
	         */
	        var isValue = function(x) {
	            return x !== null && x !== undefined;
	        }

	        /**
	         * @returns {Number} returns remainder of floored division, i.e., floor(a / n). Useful for consistent modulo
	         *          of negative numbers. See http://en.wikipedia.org/wiki/Modulo_operation.
	         */
	        var floorMod = function(a, n) { //输入经度+180，-180归到0-360
	            return a - n * Math.floor(a / n); //+1，-1
	        }

	        /**
	         * @returns {Number} the value x clamped to the range [low, high].
	         */
	        var clamp = function(x, range) {
	            return Math.max(range[0], Math.min(x, range[1]));
	        }

	        /**
	         * @returns {Boolean} true if agent is probably a mobile device. Don't really care if this is accurate.
	         */
	        var isMobile = function() {
	            return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i).test(navigator.userAgent);
	        }

	        /**
	         * Calculate distortion of the wind vector caused by the shape of the projection at point (x, y). The wind
	         * vector is modified in place and returned by this function.

	        
	        scale:1/70000
	        wind:u,v,speed
	        windy:extent

	         */
	        var distort = function(projection, λ, φ, x, y, scale, wind, windy) {

	            //uv比例缩小
	            var u = wind[0] * scale;//VELOCITY_SCALE = 1 / 70000; 
	            var v = wind[1] * scale;
	            var d = distortion(projection, λ, φ, x, y, windy);

	            // Scale distortion vectors by u and v, then add.
	            wind[0] = d[0] * u + d[2] * v;
	            wind[1] = d[1] * u + d[3] * v;
	            return wind;
	        };

	        //λ=经度 φ=纬度 x=画布x y=画布y windy=extent
	        var distortion = function(projection, λ, φ, x, y, windy) {
	            var τ = 2 * Math.PI;
	            var H = Math.pow(10, -5.2); //0.00000630957344480193 magicnumber
	            var hλ = λ < 0 ? H : -H; //给出一个偏移角度，加上这个角度后向0,0点受收缩偏移
	            var hφ = φ < 0 ? H : -H;

	            var pλ = project(φ, λ + hλ, windy); //通过投影算出偏移后的xy数据
	            var pφ = project(φ + hφ, λ, windy);

	            // Meridian scale factor (see Snyder, equation 4-3), where R = 1. This handles issue where length of 1º λ
	            // changes depending on φ. Without this, there is a pinching effect at the poles.
	            var k = Math.cos(φ / 360 * τ);//加入纬度系数

	            //偏移后的像素位置差，除以偏移角度，除以纬度系数
	            return [
	                (pλ[0] - x) / hλ / k, (pλ[1] - y) / hλ / k, (pφ[0] - x) / hφ, (pφ[1] - y) / hφ
	            ];
	        };

	        var project = function(lat, lon, windy) { // both in radians, use deg2rad if neccessary
	            var ymin = mercY(windy.south); //计算墨卡托投影的y南部弧度
	            var ymax = mercY(windy.north); //计算墨卡托投影的y北部弧度
	            var xFactor = windy.width / (windy.east - windy.west); //计算横向一个弧度对应多少像素
	            var yFactor = windy.height / (ymax - ymin); //计算纵向一个弧度对应多少像素

	            var y = mercY(deg2rad(lat)); //算lat的投影弧度
	            var x = (deg2rad(lon) - windy.west) * xFactor; //算lon的投影x的像素位置
	            var y = (ymax - y) * yFactor; // y points south  y的像素位置
	            return [x, y];
	        };



	        var createField = function(columns, bounds, callback) {

	            /**
	             * @returns {Array} wind vector [u, v, magnitude] at the point (x, y), or [NaN, NaN, null] if wind
	             *          is undefined at that point.
	             */
	            function field(x, y) {
	                var column = columns[Math.round(x)];
	                return column && column[Math.round(y)] || NULL_WIND_VECTOR;
	            }

	            // Frees the massive "columns" array for GC. Without this, the array is leaked (in Chrome) each time a new
	            // field is interpolated because the field closure's context is leaked, for reasons that defy explanation.
	            field.release = function() {
	                columns = [];
	            };

	            field.randomize = function(o) { // UNDONE: this method is terrible
	                var x, y;
	                var safetyNet = 0;
	                do {
	                    x = Math.round(Math.floor(Math.random() * bounds.width) + bounds.x);
	                    y = Math.round(Math.floor(Math.random() * bounds.height) + bounds.y)
	                } while (field(x, y)[2] === null && safetyNet++ < 30);
	                o.x = x;
	                o.y = y;
	                return o;
	            };

	            //field.overlay = mask.imageData;
	            //return field;
	            callback(bounds, field);
	        };

	        var buildBounds = function(bounds, width, height) {
	            var upperLeft = bounds[0];
	            var lowerRight = bounds[1];
	            var x = Math.round(upperLeft[0]); //Math.max(Math.floor(upperLeft[0], 0), 0);
	            var y = Math.max(Math.floor(upperLeft[1], 0), 0);
	            var xMax = Math.min(Math.ceil(lowerRight[0], width), width - 1);
	            var yMax = Math.min(Math.ceil(lowerRight[1], height), height - 1);
	            return {
	                x: x,
	                y: y,
	                xMax: width,
	                yMax: yMax,
	                width: width,
	                height: height
	            };
	        };

	        var deg2rad = function(deg) {
	            return (deg / 180) * Math.PI;
	        };

	        var rad2deg = function(ang) {
	            return ang / (Math.PI / 180.0);
	        };

	        //通过像素反算经纬度
	        var invert = function(x, y, windy) {
	            var mapLonDelta = windy.east - windy.west;
	            var worldMapRadius = windy.width / rad2deg(mapLonDelta) * 360 / (2 * Math.PI);
	            var mapOffsetY = (worldMapRadius / 2 * Math.log((1 + Math.sin(windy.south)) / (1 - Math.sin(windy.south))));
	            var equatorY = windy.height + mapOffsetY;
	            var a = (equatorY - y) / worldMapRadius;

	            var lat = 180 / Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI / 2);
	            var lon = rad2deg(windy.west) + x / windy.width * rad2deg(mapLonDelta);
	            return [lon, lat];
	        };

	        //弧度制墨卡托投影，求得投影后的弧度
	        var mercY = function(lat) {
	            return Math.log(Math.tan(lat / 2 + Math.PI / 4));
	        };




	        var interpolateField = function(grid, bounds, extent, callback) {
	            //grid ,uv的[][]分布，bounds画布的像素范围，extent经纬度范围，弧度制

	            var projection = {};
	            var velocityScale = bounds.height * VELOCITY_SCALE;

	            var columns = [];
	            var x = bounds.x;

	            //开始双线性插值
	            //遍历画布的每一个像素，然后算出经纬度，然后根据数据的经纬度做双线性插值，计算像素的值
	            function interpolateColumn(x) {
	                var column = [];
	                for (var y = bounds.y; y <= bounds.yMax; y += 2) {
	                    var coord = invert(x, y, extent); //根据画布的像素反算经纬度
	                    if (coord) {
	                        var λ = coord[0], //经度
	                            φ = coord[1]; //纬度
	                        if (isFinite(λ)) { //如果不是无穷大

	                            var wind = grid.interpolate(λ, φ); //双线性插值，返回（u,v,speed）

	                            if (wind) {

	                                wind = distort(projection, λ, φ, x, y, velocityScale, wind, extent); //畸变
	                                column[y + 1] = column[y] = wind;

	                            }
	                        }
	                    }
	                }
	                columns[x + 1] = columns[x] = column;
	            }

	            (function batchInterpolate() {
	                var start = Date.now();
	                while (x < bounds.width) {
	                    interpolateColumn(x);
	                    x += 2;



	                    if ((Date.now() - start) > 1000) { //MAX_TASK_TIME) {
	                        setTimeout(batchInterpolate, 25);
	                        return;
	                    }
	                }

	                //columns插值完成后的[width][height]=[u,v,speed]
	                createField(columns, bounds, callback);
	            })();
	        };


	        var animate = function(bounds, field) {

	            function asColorStyle(r, g, b, a) {
	                return "rgba(" + 243 + ", " + 243 + ", " + 238 + ", " + a + ")";
	            }

	            function hexToR(h) {
	                return parseInt((cutHex(h)).substring(0, 2), 16)
	            }

	            function hexToG(h) {
	                return parseInt((cutHex(h)).substring(2, 4), 16)
	            }

	            function hexToB(h) {
	                return parseInt((cutHex(h)).substring(4, 6), 16)
	            }

	            function cutHex(h) {
	                return (h.charAt(0) == "#") ? h.substring(1, 7) : h
	            }

	            function windIntensityColorScale(step, maxWind) {

	                result = [

	                    "rgba(" + hexToR('#178be7') + ", " + hexToG('#178be7') + ", " + hexToB('#178be7') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#8888bd') + ", " + hexToG('#8888bd') + ", " + hexToB('#8888bd') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#b28499') + ", " + hexToG('#b28499') + ", " + hexToB('#b28499') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#cc7e78') + ", " + hexToG('#cc7e78') + ", " + hexToB('#cc7e78') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#de765b') + ", " + hexToG('#de765b') + ", " + hexToB('#de765b') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#ec6c42') + ", " + hexToG('#ec6c42') + ", " + hexToB('#ec6c42') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#f55f2c') + ", " + hexToG('#f55f2c') + ", " + hexToB('#f55f2c') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#fb4f17') + ", " + hexToG('#fb4f17') + ", " + hexToB('#fb4f17') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#fe3705') + ", " + hexToG('#fe3705') + ", " + hexToB('#fe3705') + ", " + 1.5 + ")",
	                    "rgba(" + hexToR('#ff0000') + ", " + hexToG('#ff0000') + ", " + hexToB('#ff0000') + ", " + 1.5 + ")"
	                ];

	                result.indexFor = function(m) { // map wind speed to a style
	                    return Math.floor(Math.min(m, maxWind) / maxWind * (result.length - 1));
	                };
	                return result;
	            }

	            var colorStyles = windIntensityColorScale(INTENSITY_SCALE_STEP, MAX_WIND_INTENSITY);
	            var buckets = colorStyles.map(function() {
	                return [];
	            });

	            var particleCount = Math.round(bounds.width * PARTICLE_MULTIPLIER);
	            if (isMobile()) {
	                particleCount *= PARTICLE_REDUCTION;
	            }


	            var particles = [];
	            for (var i = 0; i < particleCount; i++) {
	                particles.push(field.randomize({
	                    age: Math.floor(Math.random() * MAX_PARTICLE_AGE) + 0
	                }));
	            }

	            function evolve() {
	                buckets.forEach(function(bucket) {
	                    bucket.length = 0;
	                });
	                particles.forEach(function(particle) {
	                    if (particle.age > MAX_PARTICLE_AGE) {
	                        field.randomize(particle).age = 0;
	                    }
	                    var x = particle.x;
	                    var y = particle.y;
	                    var v = field(x, y); // vector at current position
	                    var m = v[2];
	                    if (m === null) {
	                        particle.age = MAX_PARTICLE_AGE; // particle has escaped the grid, never to return...
	                    } else {
	                        var xt = x + v[0];
	                        var yt = y + v[1];
	                        if (field(xt, yt)[2] !== null) {
	                            // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
	                            particle.xt = xt;
	                            particle.yt = yt;
	                            buckets[colorStyles.indexFor(m)].push(particle);
	                        } else {
	                            // Particle isn't visible, but it still moves through the field.
	                            particle.x = xt;
	                            particle.y = yt;
	                        }
	                    }
	                    particle.age += 1;
	                });
	            }


	            var fadeFillStyle = "rgba(0, 0, 0, 0.8)";
	            var g = params.canvas.getContext("2d");
	            g.lineWidth = PARTICLE_LINE_WIDTH;
	            g.fillStyle = fadeFillStyle;

	            function draw() {
	                //Fade existing particle trails.

	                var prev = g.globalCompositeOperation;



	                g.globalCompositeOperation = "destination-in";

	                // g.globalCompositeOperation = "lighter";

	                g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);

	                g.globalCompositeOperation = prev;

	                // Draw new particle trails.
	                buckets.forEach(function(bucket, i) {
	                    if (bucket.length > 0) {
	                        g.beginPath();
	                        g.strokeStyle = colorStyles[i];
	                        bucket.forEach(function(particle) {
	                            g.moveTo(particle.x, particle.y);
	                            g.lineTo(particle.xt, particle.yt);
	                            particle.x = particle.xt;
	                            particle.y = particle.yt;
	                        });
	                        g.stroke();
	                    }
	                });
	            }

	            (function frame() {

	                try {
	                    windy.timer = setTimeout(function() {
	                        requestAnimationFrame(frame);
	                        evolve();
	                        draw();
	                    }, 1000 / FRAME_RATE);
	                } catch (e) {
	                    console.error(e);
	                }
	            })();
	        }


	        var start = function(bounds, width, height, extent) {

	            var mapBounds = {
	                south: deg2rad(extent[0][1]),
	                north: deg2rad(extent[1][1]),
	                east: deg2rad(extent[1][0]),
	                west: deg2rad(extent[0][0]),
	                width: width,
	                height: height
	            };

	            stop();

	            // build grid
	            buildGrid(params.data, function(grid) {
	                // interpolateField
	                interpolateField(grid, buildBounds(bounds, width, height), mapBounds, function(bounds, field) {
	                    // animate the canvas with random points
	                    windy.field = field;
	                    animate(bounds, field);
	                });

	            });



	        };

	        var stop = function() {
	            if (windy.field) windy.field.release();
	            if (windy.timer) clearTimeout(windy.timer)
	        };


	        var windy = {
	            params: params,
	            start: start,
	            stop: stop
	        };

	        return windy;
	    }



	    // shim layer with setTimeout fallback
	    window.requestAnimationFrame = (function() {
	        return window.requestAnimationFrame ||
	            window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame ||
	            window.oRequestAnimationFrame ||
	            window.msRequestAnimationFrame ||
	            function(callback) {
	                window.setTimeout(callback, 1000 / 20);
	            };
	    })();


	    return {
	        Windy: Windy
	    }


	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {



	    function init(scene) {

	        for (var i = 0; i < 20; i++) {
	            var geometry = new THREE.BoxGeometry(1, random(200, 300, 1), 1);
	            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	            var cube = new THREE.Mesh(geometry, material);
	            cube.position.set(0, 0, 0);
	            cube.rotation.x += Math.PI * random(50, 55, 0.01);
	            cube.rotation.z -= Math.PI * random(10, 15, 0.01);
	            scene.add(cube);
	        }
	    }



	    function random(min, max, p) {
	        return parseInt(Math.random() * (max - min + 1) + min) * p

	    }


	    return {
	        init: init
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ }
/******/ ]);