import * as THREE from "three";
import World from "./world";
import gsap from "gsap";

class Po {
    constructor(data) {

        const world = new World({
            showCameraPos: false,
            setCameraPos: [5, 2.6, 8.8],
            showGrid: false,
            ambientLight: false,
            orbitControls: true,
            showFloor: true
        });

        const spotLight = new THREE.SpotLight(0xffffff, 50);
        spotLight.position.set(0, 5, 0);
        spotLight.angle = .8;
        spotLight.penumbra = 1;
        spotLight.decay = 2;
        spotLight.distance = 100;
        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 2000;
        spotLight.shadow.mapSize.height = 2000;
        spotLight.shadow.camera.near = .5;
        spotLight.shadow.camera.far = 500;
        spotLight.shadow.focus = 1;
        world.scene.add(spotLight)

        const loader = new THREE.TextureLoader();
        const materialCube = [
            new THREE.MeshPhongMaterial({ map: loader.load('assets/IMG/one.png')}), //right
            new THREE.MeshPhongMaterial({ map: loader.load('assets/IMG/two.png')}), //left
            new THREE.MeshPhongMaterial({ map: loader.load('assets/IMG/three.png')}), //top
            new THREE.MeshPhongMaterial({ map: loader.load('assets/IMG/four.png')}), //bottom
            new THREE.MeshPhongMaterial({ map: loader.load('assets/IMG/five.png')}), //front
            new THREE.MeshPhongMaterial({ map: loader.load('assets/IMG/six.png')}), //back
        ]

        data.cubeInfo.forEach((item, index) => {
            const geometryCube = new THREE.BoxGeometry(1, 1, 1);

            this.cube = new THREE.Mesh(geometryCube, materialCube);
            this.cube.castShadow = true;
            this.cube.receiveShadow = true;
            world.scene.add(this.cube);
            this.cube.position.set(
                item.position[0],
                item.position[1],
                item.position[2]
            );
            this.cube.rotation.y = item.rotation;

            world.interactionManager.add(this.cube);

            this.cube.addEventListener("click", (event) =>
                this.moveObj(event, world)
            );
        });//END foreach
    }//END constructor

    moveObj(event, world) {
        gsap.to(event.target.position, {
            duration: 1,
            x: 0.5,
            y: 0.5,
            repeat: 1,
            yoyo: true
        });
        gsap.to(event.target.position, {
            duration: 1,
            y: 0.5,
            repeat: 1,
            yoyo: true
        });
    }
}

export default Po;