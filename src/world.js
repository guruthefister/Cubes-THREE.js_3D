import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive"; 

class World {
    constructor() {

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            150
        );

        this.camera.position.x = 5.2;
        this.camera.position.y = 6;
        this.camera.position.z = 8.8;

        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({
            // physicallyCorrectLights: true,
            antialias: true,
            shadowMap: true,
            outputEncoding: THREE.sRGBEncoding,
        });

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);

        document.body.appendChild(this.renderer.domElement);

        this.interactionManager = new InteractionManager(
            this.renderer,
            this.camera,
            this.renderer.domElement
        );

        this.contronls = new OrbitControls(this.camera, this.renderer.domElement);

        const al = new THREE.AmbientLight(0xffffff, .5);
            this.scene.add(al);

        this.renderer.setAnimationLoop((time) => this.animation(time));

        window.addEventListener("resize", () => 
            this.onWindowResized(this.renderer, this.camera)
        );
    }

    animation(time) {
        this.renderer.render(this.scene, this.camera);
    }
}

export default World;