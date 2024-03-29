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
    //[x: string]: any;
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
    haveDedictedCard: string;
    graphicCard: string;
    ram: number;

    // kategoria
    category: string;

    // okazja
    isOccasion: string;
    whenOccasionWasStarted: Date;

    // czy jest edytowana
    isEditing: number;

    // opis
    numberOfDescParts: number;
    part1: number;
    part2: number;
    part3: number;
    part4: number;
    part5: number;
    p1_Desc: string;
    p2_Desc: string;
    p3_Desc: string;
    p4_Desc: string;
    p5_Desc: string;
    
}
