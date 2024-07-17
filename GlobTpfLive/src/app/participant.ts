import { ParticipentImage } from "./participant-image";

export interface Participant {
    id?: number;
    email: string,
    name: string,
    password: string,
    contact: string,
    roles: string[],
    enabled: boolean,
    participentImage?: ParticipentImage
}
