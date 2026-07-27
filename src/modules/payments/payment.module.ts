import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payments.entity';
import { PaymentsService } from './services/payment.service';
import { PaymentsController } from './controllers/payment.controller';
import { RazorpayService } from './services/razorpay.service';
import { MatchesModule } from '../matches/matches.module';
import { AuthModule } from '../auth/auth.module';
import { SubscriptionPlanEntity } from '../subscriptions/entities/subscription_plans.entity';
import { UserSubscriptionEntity } from '../subscriptions/entities/user_subscriptions.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentEntity, SubscriptionPlanEntity, UserSubscriptionEntity]),
        MatchesModule,
        AuthModule,
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService, RazorpayService],
    exports: [PaymentsService],
})
export class PaymentsModule { }
