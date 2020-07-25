import { User } from './User';
import { Photo } from './Photo';

export interface Item {
    id: number;
    name: string;
    quantity: number;
    description: string;
    dateAdded: Date;
    itemPhotos: Photo[];
    sellerId: number;
    seller: User;
    buyerId: number;
    buyer: User;
}
