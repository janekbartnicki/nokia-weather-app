export type GeographiesProps = {
    type: string;
    properties: {
        [key: string]: number | string | null;
    };
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    rsmKey: string;
    svgPath: string;
};