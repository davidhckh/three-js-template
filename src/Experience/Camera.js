import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MathUtils } from 'three'

export default class Camera
{
    fov = 50
    responsiveFov = true

    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(this.getFov(), this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(8, 0, 8)
        
        this.scene.add(this.instance)
    }

    /** Returns responsive fov if enabled */
    getFov() {
        if(this.responsiveFov) {
            const fov = this.fov
            const planeAspectRatio = 1.8
            const currentAspectRatio = this.sizes.width / this.sizes.height
            let fovToReturn = 0
    
            if (currentAspectRatio > planeAspectRatio) {
                fovToReturn = fov;
            } else {
    
                const cameraHeight = Math.tan(MathUtils.degToRad(fov / 2));
                const ratio = currentAspectRatio / planeAspectRatio;
                const newCameraHeight = cameraHeight / ratio;
                fovToReturn = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
            }
    
            return fovToReturn
        } else {
            return this.fov
        }
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.fov = this.getFov()
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}