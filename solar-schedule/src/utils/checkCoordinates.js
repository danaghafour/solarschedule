import * as turf from "@turf/turf";

// original shapefile from https://www.naturalearthdata.com
import GermanyPoly from "../geo/germany_outline.json";

export default function areCoordinatesInGermany(lat, long) {
    if (!GermanyPoly) {
        return false;
    }

    // create the point, switch the order of latitude and longitue
    const point = turf.point([long, lat]);
    return turf.booleanPointInPolygon(point, GermanyPoly);
}
