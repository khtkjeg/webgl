define([], function() {



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
})
