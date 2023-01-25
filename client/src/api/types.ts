export type Login = {
 email: string;
 password: string;
};

export type Address = {
 address: string;
 city: string;
 zipCode: string;
 country: string;
};

export type UserNames = {
 firstName: string;
 lastName: string;
};

export type UserAddress = {
 userInfo: UserNames;
 addresses: Address[];
};
