import TWEEN from 'tween'
import { freezePage } from '../util/freezePage'
import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    BoxGeometry,
    TextureLoader,
    PlaneGeometry,
    Raycaster,
    Vector2,
    MeshBasicMaterial,
    Mesh
} from 'three';
freezePage();
class ScrollScene {
    constructor(props) {
        this.speed = props.speed || 7;
        this.direction = props.direction || 1;
        this.isPause = props.isPause || false;
        this.imgList = props.imgList;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.webGLRenderer = new WebGLRenderer();
        this.webGLRenderer.setClearColor(0x333333);
        this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        this.webGLRenderer.shadowMapEnabled = true;
        this.init();
        document.body.appendChild(this.webGLRenderer.domElement);
    }
    init = () => {
        freezePage();
        this._bindEvent();
        this.bindCamera();
        for (let i = 0; i < this.imgList.length; i++) {
            let img = this.imgList[i];
            this.drawScene(img.url, img.w, img.h, img.x, img.y, img.z, img.name);
        }
        this.animate();
    }
    drawScene = (img, w, h, x, y, z, name) => {
        let mapTexture = new TextureLoader().load(img),
            sceneGeometry = new PlaneGeometry(w, h),
            planeMaterial = new MeshBasicMaterial({
                transparent: true,
                map: mapTexture
            }),
            plane = new Mesh(sceneGeometry, planeMaterial);
        plane.position.x = x;
        plane.position.y = y;
        plane.position.z = z;
        plane.name = name;
        this.scene.add(plane);
    }
    animate = () => {
        requestAnimationFrame(this.animate);
        TWEEN.update();
        this.render();
    }
    render = () => {
        if (this.isPause) {
            return;
        }
        if (this.camera.position.z > 3000) {
            this.camera.position.z = 3000;
        }

        if (this.camera.position.z < 1299) {
            this.camera.position.z = 1300;
        }
        this.webGLRenderer.clear();
        this.webGLRenderer.render(this.scene, this.camera);
    }
    bindCamera = () => {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1300;
        this.camera.lookAt(this.scene.position);
        this.tween = new TWEEN.Tween(this.camera.position)
            .to({ z: 3000 }, 2000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
            })
            .start();
    }
    _bindEvent = () => {
        let startPositon = 0;
        let originalZ = 0;
        let lastY = 0;
        let v = 0;
        let lastTime = 0;
        window.addEventListener('touchstart', (e) => {
            TWEEN.removeAll();
            startPositon = e.touches[0].clientY;
            lastY = startPositon;
            lastTime = (new Date()).getTime();
            v = 0;
            originalZ = this.camera.position.z;
        })
        window.addEventListener('touchmove', (e) => {
            let move = e.touches[0].clientY - startPositon;
            let currentTime = (new Date()).getTime();
            let currentY = e.touches[0].clientY;
            v = (currentY - lastY) / (currentTime - lastTime);
            lastY = currentY;
            lastTime = currentTime;
            this.camera.position.z = originalZ + move * 4;
        })
        window.addEventListener('touchend', (e) => {
            this.tween.to({ z: this.camera.position.z + v * 1000 }, Math.abs(v * 1000)).easing(TWEEN.Easing.Quadratic.Out).start()
        })
        let raycaster = new Raycaster();//光线投射，用于确定鼠标点击位置 
        let mouse = new Vector2();//创建二维平面
        window.addEventListener("click", (e) => {
            //将html坐标系转化为webgl坐标系，并确定鼠标点击位置
            mouse.x = e.clientX / this.webGLRenderer.domElement.clientWidth * 2 - 1;
            mouse.y = -(e.clientY / this.webGLRenderer.domElement.clientHeight * 2) + 1;
            //以camera为z坐标，确定所点击物体的3D空间位置
            raycaster.setFromCamera(mouse, this.camera);
            //确定所点击位置上的物体数量
            let intersects = raycaster.intersectObjects(this.scene.children);
            //选中后进行的操作
            if (intersects.length) {
                console.log(intersects[0].object.name)
            }
        });
    }
}
$(function () {
    let imgList = [
        { url: './img/1.jpg', name: 'bg', w: 2400, h: 2574, x: 0, y: 0, z: 0 },
        { url: './img/car.png', name: 'car', w: 595, h: 290, x: 0, y: 0, z: 100 },
        { url: './img/nei-2.png', name: 'peo1', w: 204 * 0.8, h: 669 * 0.8, x: -280, y: -100, z: 550 },
        { url: './img/nei-3.png', name: 'peo2', w: 217 * 0.7, h: 1002 * 0.7, x: 300, y: -180, z: 800 },
        { url: './img/nei-1.png', name: 'peo3', w: 348 * 0.6, h: 1219 * 0.6, x: -100, y: -200, z: 1300 },
        { url: './img/nei-2.png', name: 'peo4', w: 204 * 0.8, h: 669 * 0.8, x: -280, y: -100, z: 1600 },
        { url: './img/nei-3.png', name: 'peo5', w: 217 * 0.7, h: 1002 * 0.7, x: 300, y: -180, z: 1900 },
        { url: './img/nei-1.png', name: 'pe6', w: 348 * 0.6, h: 1219 * 0.6, x: -100, y: -200, z: 2400 }
    ];
    var threeD = new ScrollScene({ imgList: imgList });
})


