import Attraction, {AttractionWithDistanceFromUser} from "../types/Attraction";
import Location from "../types/Location";
import {distanceInKmBetweenEarthCoordinates} from "./locations";

function getAttractionLocation(attraction: Attraction): Location {
    return {longitude: attraction.X, latitude: attraction.Y};
}

export function getAttractionWithDistanceFromUser(userLocation: Location, attraction: Attraction): AttractionWithDistanceFromUser {
    return {
        ...attraction,
        distanceFromUser: distanceInKmBetweenEarthCoordinates(userLocation, getAttractionLocation(attraction))
    };
}

export function getAttractionsSortedByDistanceFromUserLocation(userLocation: Location, attractions: AttractionWithDistanceFromUser[]): AttractionWithDistanceFromUser[] {
    return attractions.sort((attraction1, attraction2) => {
        return attraction1.distanceFromUser - attraction2.distanceFromUser;
    })
}