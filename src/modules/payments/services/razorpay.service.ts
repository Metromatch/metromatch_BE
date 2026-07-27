import { ConfigService } from "@nestjs/config";
import Razorpay from "razorpay";
import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';

@Injectable()
export class RazorpayService {

    private razorpay: Razorpay;

    constructor(
        private configService: ConfigService
    ) {
        const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
        const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

        if (!keyId || !keySecret) {
            throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be defined in environment variables');
        }

        this.razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });
    }

    async createOrder(amount: number, receipt: string) {
        return this.razorpay.orders.create({ amount, currency: 'INR', receipt });
    }

    verifySignature(
        orderId: string,
        paymentId: string,
        signature: string,
    ): boolean {
        const expected = crypto
            .createHmac('sha256', this.configService.get<string>('RAZORPAY_KEY_SECRET')!)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        return expected === signature;
    }

}