
export const sectorData: {
    [key: string]: {
        name: string;
        definition: string;
        domains: {
            [key: string]: {
                name: string;
                description: string;
                industries: string[];
            }
        };
        dashboardComponents: string[];
    }
} = {};

export type SectorKey = keyof typeof sectorData;
export type DomainKey<S extends SectorKey> = keyof (typeof sectorData)[S]["domains"];
