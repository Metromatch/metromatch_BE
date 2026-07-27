import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RazorpayService } from "./razorpay.service";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentEntity } from "../entities/payments.entity";
import { Repository } from "typeorm";
import { SubscriptionPlanEntity } from "src/modules/subscriptions/entities/subscription_plans.entity";
import { CreateOrderDto } from "../dto/order.dto";
import { VerifyPaymentDto } from "../dto/verify_payment.do";
import { UserSubscriptionEntity } from "src/modules/subscriptions/entities/user_subscriptions.entity";

@Injectable()
export class PaymentsService {
    constructor(
        private razorpay: RazorpayService,
        @InjectRepository(PaymentEntity)
        private paymentRepo: Repository<PaymentEntity>,
        @InjectRepository(SubscriptionPlanEntity)
        private planRepo: Repository<SubscriptionPlanEntity>,
        @InjectRepository(UserSubscriptionEntity)
        private userSubscriptionRepo: Repository<UserSubscriptionEntity>,
    ) { }

    async createOrder(
        userId: string,
        dto: CreateOrderDto,
    ) {
        const plan =
            await this.planRepo.findOne({ where: { id: dto.planId } });

        if (!plan) {
            throw new NotFoundException('Plan not found');
        }
        console.log('Hereeeeeeeeeeee1111111')
        const receipt = `plan_${Date.now()}`;
        let order;
        try {
            order = await this.razorpay.createOrder(
                Math.round(Number(plan.price) * 100), receipt);

        } catch (error) {
            console.log('Hereeeeeeeeeeee', error)

        }
        const payment = this.paymentRepo.create({
            amount: '499.00',
            currency: 'INR',
            provider: 'RAZORPAY',
            razorpayOrderId: order.id,
            status: 'CREATED',
            user: {
                id: userId,
            } as any,

        });

        await this.paymentRepo.save(payment);

        return {

            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID || 'rzp_test_TINKRKzEdJuraU',

        };

    }

    async verifyPayment(userId: string, dto: VerifyPaymentDto,
    ) {
        const payment = await this.paymentRepo.findOne({ where: { razorpayOrderId: dto.razorpayOrderId }, relations: { user: true, }, });

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        const valid = this.razorpay.verifySignature(dto.razorpayOrderId, dto.razorpayPaymentId, dto.razorpaySignature);

        if (!valid) throw new BadRequestException('Invalid payment signature');

        payment.status = 'SUCCESS';
        payment.razorpayPaymentId = dto.razorpayPaymentId;
        payment.razorpaySignature = dto.razorpaySignature;

        await this.paymentRepo.save(payment);

        const plan = await this.planRepo.findOne({ where: { id: dto.planId, } });
        const now = new Date();
        const end = new Date(now);
        end.setDate(end.getDate() + Number(plan?.durationDays || 0));

        const subscription = this.userSubscriptionRepo.create({
            userId,
            planId: dto.planId,
            status: 'ACTIVE',
            startDate: now,
            endDate: end,
        });

        await this.userSubscriptionRepo.save(
            subscription,
        );

        payment.subscription = subscription;

        await this.paymentRepo.save(payment);

        return {
            success: true,
        };
    }

}