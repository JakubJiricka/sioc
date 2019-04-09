
export function placeToAddress(place) {
    const address = {
        latitude: place.geometry.location.lat(),
        altitude: place.geometry.location.lng()
    };
    place.address_components.forEach(c => {
        switch (c.types[0]) {
            case 'street_number':
                address.streetNumber = c.long_name;
                break;
            case 'route':
                address.streetName = c.long_name;
                break;
            case 'neighborhood':
            case 'locality':
                address.city = c.long_name;
                break;
            case 'administrative_area_level_1':
                address.state = c.long_name;
                break;
            case 'postal_code':
                address.zip = c.long_name;
                break;
            case 'country':
                address.country = c.long_name;
                break;
            default:
                break;
        }
    });

    return address;
}