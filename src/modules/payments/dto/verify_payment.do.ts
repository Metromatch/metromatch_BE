import { IsString, IsUUID } from 'class-validator';

export class VerifyPaymentDto {
    @IsUUID()
    planId: string;

    @IsString()
    razorpayOrderId: string;

    @IsString()
    razorpayPaymentId: string;

    @IsString()
    razorpaySignature: string;
}