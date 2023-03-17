export type Login = {
 email: string;
 password: string;
};

export type SignUp = Login & {
 firstName: string;
 lastName: string;
};

export type Email = {
 email: string;
};
