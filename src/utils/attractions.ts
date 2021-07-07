import Attraction from "../types/Attraction";
import Location from "../types/Location";
import {distanceInKmBetweenEarthCoordinates} from "./locations";

function getAttractionLocation(attraction: Attraction): Location {
    return {longitude: attraction.X, latitude: attraction.Y};
}

// Can be optimized by pre-calculating all of the distances and then sorting,
// in case of a performance issue - this can be implemented
export function getAttractionsSortedByDistanceFromUserLocation(userLocation: Location, attractions: Attraction[]): Attraction[] {
    return attractions.sort((attraction1, attraction2) => {
        const attraction1Distance = distanceInKmBetweenEarthCoordinates(userLocation, getAttractionLocation(attraction1))
        const attraction2Distance = distanceInKmBetweenEarthCoordinates(userLocation, getAttractionLocation(attraction2))
        return attraction1Distance - attraction2Distance;
    })
}