import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    UnauthorizedException,
    Delete,
    Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '../services/payment.service';
import { CreateOrderDto } from '../dto/order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { VerifyPaymentDto } from '../dto/verify_payment.do';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentService: PaymentsService) { }

    @Post('create-order')
    async createOrder(@Request() req, @Body() dto: CreateOrderDto) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        console.log('User', userId)
        return this.paymentService.createOrder(userId, dto);

    }

    @Post('verify')
    verify(@Request() req, @Body() dto: VerifyPaymentDto,) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.paymentService.verifyPayment(userId, dto);
    }
}


