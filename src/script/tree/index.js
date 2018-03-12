import '../../css/tree/index.less'
import * as THREE from 'three'
const Color = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    brownDark:0x23190f,
    pink:0xF5986E,
    yellow:0xf4ce93,
    blue:0x68c3c0,
}
/**
 * 玫瑰类
 */
class Grace {
    constructor(props) {
        var geometry = new THREE.BoxGeometry( 200, 200, 200);
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
         this.mesh = new THREE.Mesh( geometry, material );
         this.mesh.castShadow = true;
         this.mesh.receiveShadow = true;
         this.mesh.position.set(0,0,300)
         this.mesh.rotation.z = -.3;
         this.mesh.rotation.x = -.3;
         this.mesh.rotation.y = -.3;
        }
}
class Earth {
    constructor(props) {
        var geometry = new THREE.BoxGeometry( 2000, 1, 2000 );
        var material = new THREE.MeshBasicMaterial( {color: 0x866060} );
         this.mesh = new THREE.Mesh( geometry, material );
         this.mesh.rotation.y += -.03;
         this.mesh.castShadow = true;
         this.mesh.receiveShadow = true;
         this.mesh.position.set(0,-500,0)
        }
}
class Light {
    constructor(props) {

         this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
         
         this.ambientLight = new THREE.AmbientLight(0xdc8874, .5);
         
         var shadowLight = new THREE.DirectionalLight(0xffffff, .9);
         shadowLight.position.set(150, 350, 350);
         shadowLight.castShadow = true;
         shadowLight.shadow.camera.left = -400;
         shadowLight.shadow.camera.right = 400;
         shadowLight.shadow.camera.top = 400;
         shadowLight.shadow.camera.bottom = -400;
         shadowLight.shadow.camera.near = 1;
         shadowLight.shadow.camera.far = 1000;
         shadowLight.shadow.mapSize.width = 4096;
         shadowLight.shadow.mapSize.height = 4096;
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
        camera.position.z = 2000;
        camera.position.y = 0;

        let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
        renderer.shadowMap.enabled = true;
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
$(function() {
    var scene = new TreeScene();
    var grace = new Grace();
    var earth = new Earth();
    var light = new Light();
    scene.add(grace.mesh);
    scene.add(earth.mesh);
    scene.add(light.hemisphereLight)
    scene.add(light.ambientLight)
    scene.add(light.shadowLight)
    function loop() {
        grace.mesh.rotation.z += -.03;
        grace.mesh.rotation.x += -.03;
        grace.mesh.rotation.y += -.03;
        requestAnimationFrame(loop);
        scene.render();
    }
    loop();
})