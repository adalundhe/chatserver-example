export interface User {
    id: string;
    name: string;
    currentRoom?: string;
    tokens: string[];
}