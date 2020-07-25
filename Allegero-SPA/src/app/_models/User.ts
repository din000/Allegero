import { Item } from './Item';

export interface User {
    id: number;
    username: string;
    publicPhotoID: string;
    itemsToSell: Item[];
    boughtItem: Item[];
}
