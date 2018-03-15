import '../../css/tree/index.less'
import * as THREE from 'three'
const Color = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    brownDark: 0x23190f,
    pink: 0xF5986E,
    yellow: 0xf4ce93,
    blue: 0x68c3c0,
}
/**
 * 玫瑰类
 */
class Grace {
    constructor(props) {
        var geo = new THREE.BoxGeometry(10, 10, 10);
        var mat = new THREE.MeshPhongMaterial({ color: 0x8bc34a ,shading:THREE.FlatShading});
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.castShadow = true;
        this.mesh.position.set(0, 10, 50)
    }
}
class Earth {
    constructor(props) {
        var geo = new THREE.BoxGeometry(100, 10,100);
        var mat = new THREE.MeshPhongMaterial({ color: 0x795548,shading:THREE.FlatShading});
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.receiveShadow = true;
        this.mesh.position.set(0, -100, 50)
    }
}
class Light {
    constructor(props) {

        this.hemisphereLight = new THREE.HemisphereLight(0xfdc572, 0x9ad1fd, .9)

        this.ambientLight = new THREE.AmbientLight(0x9ad1fd, .5);

        var shadowLight = new THREE.DirectionalLight(0xff0057, .9);
        shadowLight.position.set(-50, 60, -10);
        // shadowLight.lookAt( 0, 0, 0)
        
        shadowLight.castShadow  = true;
        shadowLight.shadow.camera.left = -50;
        shadowLight.shadow.camera.right = 50;
        shadowLight.shadow.camera.top = 50;
        shadowLight.shadow.camera.bottom = -50;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 400;
        shadowLight.shadow.mapSize.width = 512;
        shadowLight.shadow.mapSize.height = 512;
        this.shadowLight = shadowLight;
    }
}

/**
 * 场景类
 */
class TreeScene {
    constructor(props) {
        this.container = document.getElementById('world');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.init();
    }
    init() {
        let HEIGHT = window.innerHeight,
            WIDTH = window.innerWidth;

        let scene = new THREE.Scene();
        let aspectRatio = WIDTH / HEIGHT,
            fieldOfView = 50,
            nearPlane = .1,
            farPlane = 2000;
        let camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        camera.position.x = 0;
        camera.position.z = 0;
        camera.position.y = 200;
        let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
        renderer.shadowMapEnabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        this.container.appendChild(renderer.domElement);
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    add(mash) {
        this.scene.add(mash)
    }
}
$(function () {
    var scene = new TreeScene();
    var grace = new Grace();
    var earth = new Earth();
    var light = new Light();
    scene.add(light.hemisphereLight)
    scene.add(light.ambientLight)
    scene.add(light.shadowLight)
    scene.add(grace.mesh);
    scene.add(earth.mesh);
    scene.camera.rotation.x = -1.4;
    scene.camera.position.z = 100;
    var intensity = 0.002
    function loop() {
        if (light.shadowLight.intensity > 0.9) {
            intensity = -0.005;
        }
        if (light.shadowLight.intensity < 0.1) {
            intensity = 0.005;
        }
        // light.shadowLight.intensity += intensity;
        // grace.mesh.rotation.z += -.03;
        // grace.mesh.rotation.x += -.03;
        // grace.mesh.rotation.y += -.03;
        requestAnimationFrame(loop);
        scene.render();
    }
    loop();
})
