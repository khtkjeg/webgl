define(['../ref/OrbitControls', './windFlow', './pollutants'], function(OBC, WF, POLL) {

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
})
