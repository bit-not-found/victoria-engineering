export interface CoverageZone {
    id: string;
    name: string;
    coordinates: [number, number][]; // Array of [lat, lng]
    color: string;
}

// Center of Springs, Gauteng
const SPRINGS_CENTER = {
    lat: -26.2540,
    lng: 28.4406
};

// Approximate coverage area (can be edited by adding more precise coordinates)
export const coverageZones: CoverageZone[] = [
    {
        id: 'springs-central',
        name: 'Springs Central Coverage',
        color: '#0066FF', // Primary brand color
        coordinates: [
            [-26.2300, 28.4100],
            [-26.2300, 28.4700],
            [-26.2800, 28.4700],
            [-26.2800, 28.4100],
        ]
    }
];

export const mapCenter: [number, number] = [SPRINGS_CENTER.lat, SPRINGS_CENTER.lng];
export const defaultZoom = 13;

export function isPointInPolygon(point: [number, number], vs: [number, number][]): boolean {
    // ray-casting algorithm based on
    // https://github.com/substack/point-in-polygon/blob/master/index.js
    const x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0], yi = vs[i][1];
        const xj = vs[j][0], yj = vs[j][1];

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}
