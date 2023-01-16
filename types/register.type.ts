import { optionType } from "types/components/select.types";
import { MainRepositoryInterface } from "types/mainRepository.type";

export interface RegisterProps {
    firstName: string,
    lastName: string,
    email: string,
    gender: optionType,
    countryCode: optionType,
    mobile: string,
    password: string;
    confirmPassword: string;
}

export interface RegisterInterface extends MainRepositoryInterface {
    registerUser(data: any): Promise<RegisterProps>;
}
