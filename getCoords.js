function getPosition(point){
    // point is geolocation, point = {latitude:'123.xx',longitude:'37.xx'}
    const camera = document.querySelector('[gps-camera]').components['gps-camera'];
    let position = { x: 0, y: 0, z: 0 };

        // update position.x
    let dstCoords = {
        longitude: point.longitude,
        latitude: camera.currentCoords.latitude,
    };

    position.x = camera.computeDistanceMeters(camera.currentCoords, dstCoords);
    position.x *= point.longitude > camera.currentCoords.longitude ? 1 : -1;

    // update position.z
    dstCoords = {
        longitude: camera.currentCoords.longitude,
        latitude: point.latitude,
    };

    position.z = camera.computeDistanceMeters(camera.currentCoords, dstCoords);
    position.z *= point.latitude > camera.currentCoords.latitude ? -1 : 1;

    if (position.y !== 0) {
        let altitude = camera.currentCoords.altitude !== undefined ? camera.currentCoords.altitude : 0;
        position.y = position.y - altitude;
    }
    
    //return position = { x: x, y: y, z: z }
    return position;
}