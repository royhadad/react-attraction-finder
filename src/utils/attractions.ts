import Attraction, {AttractionWithDistanceFromUser} from "../types/Attraction";
import Location from "../types/Location";
import {distanceInKmBetweenEarthCoordinates} from "./locations";

function getAttractionLocation(attraction: Attraction): Location {
    return {longitude: attraction.Y, latitude: attraction.X};
}

export function getAttractionWithDistanceFromUser(userLocation: Location, attraction: Attraction): AttractionWithDistanceFromUser {
    return {
        ...attraction,
        distanceFromUser: distanceInKmBetweenEarthCoordinates(userLocation, getAttractionLocation(attraction))
    };
}

export type AttractionType = AttractionWithDistanceFromUser['Attraction_Type'];

export function getMostCommonAttractionTypeIn40KMRadius(attractions: AttractionWithDistanceFromUser[]): AttractionType | undefined {
    // Creating a HashMap where the keys are the attraction types and the values are the number of attractions with that type in a 40 km radius
    const counter = new Map<AttractionType, number>();
    attractions.forEach((attraction) => {
        if (attraction.distanceFromUser <= 40) {
            const currentAttractionTypeCounter = counter.get(attraction.Attraction_Type);
            if (currentAttractionTypeCounter === undefined) {
                counter.set(attraction.Attraction_Type, 1);
            } else {
                counter.set(attraction.Attraction_Type, currentAttractionTypeCounter + 1);
            }
        }
    })

    // getting the attraction with the highest counter
    let currentMostCommonAttractionType: AttractionType | undefined = undefined;
    let currentMostCommonAttractionTypeCounter: number = 0;
    Array.from(counter.entries()).forEach(([attractionType, attractionTypeCounter]) => {
        if (attractionTypeCounter > currentMostCommonAttractionTypeCounter) {
            currentMostCommonAttractionType = attractionType;
            currentMostCommonAttractionTypeCounter = attractionTypeCounter;
        }
    })

    return currentMostCommonAttractionType;
}

export function getAttractionsSortedByDistanceFromUserLocation(userLocation: Location, attractions: AttractionWithDistanceFromUser[]): AttractionWithDistanceFromUser[] {
    return attractions.sort((attraction1, attraction2) => {
        return attraction1.distanceFromUser - attraction2.distanceFromUser;
    })
}