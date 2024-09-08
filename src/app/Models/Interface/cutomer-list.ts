export interface ICutomerList {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    postalCode:number;
}

export interface APIResponceModel{
    isSuccess: boolean;
    message: string;
    code: number;
    data: any;
}