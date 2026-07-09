export interface ICreateMetroStation {
    name: string;
    line: string;
    place: string;
    unique_name_and_place?: string;
}

export interface IUpdateMetroStation {
    name?: string;
    line?: string;
    place?: string;
}