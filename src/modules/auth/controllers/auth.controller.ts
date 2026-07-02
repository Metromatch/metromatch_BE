import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { SignupDto } from "../dto/signup.dto";
import { LoginDto } from "../dto/login.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    signup(
        @Body() dto: SignupDto,
    ) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signin(@Body() dto: LoginDto) {
        return this.authService.signin(dto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout(@Request() req: any) {
        return this.authService.logout(req.user.userId)
    }
}