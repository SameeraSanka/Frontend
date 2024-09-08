export class Customer{
    firstName:   string;
    lastName:    string;
    phoneNumber: string;
    email:       string;
    address:     string;
    city:        string;
    postalCode:  number;

    constructor(){
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.email = '';
        this.address = '';
        this.city = '';
        this.postalCode = 0;
    }
}