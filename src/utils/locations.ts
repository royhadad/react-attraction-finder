import Location from "../types/Location";

function degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

// based on:
// https://en.wikipedia.org/wiki/Great-circle_distance
// https://stackoverflow.com/a/365853/13088939
export function distanceInKmBetweenEarthCoordinates(location1: Location, location2: Location): number {
    const EARTH_RADIUS_KM = 6371;

    const distanceLatitudeInRadians = degreesToRadians(location2.latitude - location1.latitude);
    const distanceLongitudeInRadians = degreesToRadians(location2.longitude - location1.longitude);

    const location1LatitudeInRadians = degreesToRadians(location1.latitude);
    const location2LatitudeInRadians = degreesToRadians(location2.latitude);

    const a = Math.pow(Math.sin(distanceLatitudeInRadians / 2), 2) +
        Math.pow(Math.sin(distanceLongitudeInRadians / 2), 2) * Math.cos(location1LatitudeInRadians) * Math.cos(location2LatitudeInRadians);
    return EARTH_RADIUS_KM * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}