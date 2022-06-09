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


        const raccoon = await loadGLTF('./assets/models/musicband-raccoon/scene.gltf');
        raccoon.scene.scale.set(0.1, 0.1, 0.1);
        raccoon.scene.position.set(0, -0.4, 0);
        raccoon.scene.userData.clickable = true;

        const anchor = mindarThree.addAnchor(0);
        // anchor.group.add(plane); 
        anchor.group.add(raccoon.scene)




        // audio 
        const audioClip = await loadAudio('./assets/sounds/musicband-drum-set.mp3');

        const listerner = new THREE.AudioListener();
        const audio = new THREE.PositionalAudio(listerner);

        anchor.group.add(audio);
        camera.add(listerner);

        audio.setRefDistance(100);
        audio.setBuffer(audioClip);
       // audio.setLoop(true); enable this to loop audio...


        // user interaction

        document.body.addEventListener("click", (e) => {
           const mouseX =  (e.clientX / window.innerWidth) * 2 - 1;
           const mouseY =  -1 * ((e.clientY / window.innerHeight) * 2 - 1);
           const mouse = new THREE.Vector2(mouseX, mouseY);

           const raycaster = new THREE.Raycaster();
           raycaster.setFromCamera(mouse, camera);

          const intersects = raycaster.intersectObjects(scene.children, true);

          if (intersects.length > 0){
            let o = intersects[0].object;
            while (o.parent && !o.userData.clickable){
                o = o.parent;
            }

            if (o.userData.clickable){
                if (o == raccoon.scene);{
                audio.play()
                }
            }
          }
        });




        // handles when target is located
        // anchor.onTargetFound = () => {
        //     audio.play();
        // }
        // anchor.onTargetLost = () => {
        //     audio.pause();
        // }

        // animations

        const mixer = new THREE.AnimationMixer(raccoon.scene);
        const action = mixer.clipAction(raccoon.animations[0]);
        action.play();
        const clock = new THREE.Clock();

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();

            raccoon.scene.rotation.set(0, raccoon.scene.rotation.y + delta, 0)
            mixer.update(delta);
            renderer.render(scene, camera);
        });
    }
    start();

});