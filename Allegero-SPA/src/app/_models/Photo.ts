import { Item } from './Item';

export interface Photo {
    id: number;
    url: string;
    isMain: boolean;
    publicId: string;
    item: Item;
    itemId: number;
}
