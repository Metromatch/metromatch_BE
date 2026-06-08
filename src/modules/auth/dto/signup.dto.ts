// import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SignupDto {

    // @IsOptional()
    // @IsString()
    // @IsEmail()
    email: string

    // @IsOptional()
    // @IsString()
    // @IsNotEmpty()
    phone: string

    // @IsOptional()
    // @IsString()
    // @IsNotEmpty()
    password: string
    deviceId: string
    deviceName: string
}