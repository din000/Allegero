import { User } from './User';
import { Photo } from './Photo';

// niestety po przemysleniu klasa Item to laptopy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// niestety po przemysleniu klasa Item to laptopy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// niestety po przemysleniu klasa Item to laptopy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// niestety po przemysleniu klasa Item to laptopy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// niestety po przemysleniu klasa Item to laptopy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// niestety po przemysleniu klasa Item to laptopy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// niestety po przemysleniu klasa Item to laptopy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export interface Item {
    id: number;
    name: string;
    price: number;
    newestPrice: number;
    quantity: number;
    description: string;
    dateAdded: Date;
    itemPhotos: Photo[];
    sellerId: number;
    seller: User;
    buyerId: number;
    buyer: User;

    // glowne info o laptopach
    condition: string;
    haveDedictedCard: boolean;
    graphicCard: string;
    ram: number;

    // kategoria
    category: string;

    // okazja
    isOccasion: boolean;
    whenOccasionWasStarted: Date;
}
