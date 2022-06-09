import { loadGLTF, loadAudio } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
                  imageTargetSrc: './assets/targets/LT-square.mind'
            //imageTargetSrc: './assets/targets/musicband.mind',
        });
        const { renderer, scene, camera } = mindarThree

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light)


        // Blue square 

        // const geometry = new THREE.PlaneGeometry(1, 1);
        // const material = new THREE.MeshBasicMaterial({color: 0x0000ff, transparent: true, opacity: 5});
        // const plane = new THREE.Mesh(geometry, material);


        const gltf = await loadGLTF('./assets/models/musicband-raccoon/scene.gltf');
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, -0.4, 0);

        const anchor = mindarThree.addAnchor(0);
        // anchor.group.add(plane); 
        anchor.group.add(gltf.scene)



        const audioClip = await loadAudio('./assets/sounds/musicband-background.mp3');

        const listerner = new THREE.AudioListener();
        const audio = new THREE.PositionalAudio(listerner);

        anchor.group.add(audio);
        camera.add(listerner);

        audio.setRefDistance(100);
        audio.setBuffer(audioClip);
        audio.setLoop(true);



        // handles when target is located
        anchor.onTargetFound = () => {
            audio.play();
        }
        anchor.onTargetLost = () => {
            audio.pause();

        }




        // gltf.animations

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        const clock = new THREE.Clock();

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();

            gltf.scene.rotation.set(0, gltf.scene.rotation.y + delta, 0)
            mixer.update(delta);
            renderer.render(scene, camera);
        });
    }
    start();

});