export interface ListPokemon {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
}

export interface SearchItemInfo {
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
}
