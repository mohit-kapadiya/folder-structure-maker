export interface Nodemodel {
    type : 'folder' | 'file' | 'unset' | null;
    name? : string;
    children? : Nodemodel[];
    id : number;
}
