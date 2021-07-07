import Attraction from "../types/Attraction";
import Location from "../types/Location";

export const getAttractionsSortedByDistanceFromUserLocation = (userLocation: Location, attractions: Attraction[]): Attraction[] => {
    return attractions.sort((attraction1, attraction2) => {
        const attraction1Distance = getDistance(userLocation, {lat: attraction1.X, long: attraction1.Y})
        const attraction2Distance = getDistance(userLocation, {lat: attraction2.X, long: attraction2.Y})
        return attraction1Distance - attraction2Distance;
    })
}

const getDistance = (location1: Location, location2: Location): number => {
    return 1;
}