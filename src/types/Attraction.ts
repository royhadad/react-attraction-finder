export default interface Attraction {
    "Id": string,
    "Name":string;
    "ShortDescription": string;
    "FullDescription": string;
    "VendorId": string;
    "Vendor_Name": string;
    "Product_Url": string;
    "Accessibility": string;
    "Address": string;
    "Attraction_Type": string;
    "Blue_Flag": string;
    "City": string;
    "Diving_beach": string;
    "Email": string;
    "Notes": string;
    "Notes_for_opening_hours": string;
    "Opening_Hours": string;
    "Parking": string;
    "Phone": string;
    "Region": string;
    "Scheduled_visits": string;
    "Suitable_for_Children": string;
    "Surfing_beach": string;
    "URL": string;
    "X": number;
    "Y": number;
}

export type AttractionWithDistanceFromUser = Attraction & {distanceFromUser: number}