import { BadRequestException, Injectable } from "@nestjs/common"
import { UsersService } from "../../users/services/users.service"
import { TokenService } from "./token.service"
import { UserSessionService } from "./user_session.service"
import { SignupDto } from "../dto/signup.dto"
import * as bcrypt from 'bcrypt'
import { LoginDto } from "../dto/login.dto"

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly sessionService: UserSessionService,
    ) { }

    private async generateTokensAndSaveSession(userId: string, deviceId: string) {
        const accessToken = this.tokenService.generateAccessToken(userId)
        const refreshToken = this.tokenService.generateRefreshToken(userId)
        const [accessTokenHash, refreshTokenHash, existingSession] = await Promise.all([
            bcrypt.hash(accessToken, 10),
            bcrypt.hash(refreshToken, 10),
            this.sessionService.findSessionByUserIdOrDeviceId(userId, deviceId)
        ])

        const payload = { userId, refreshTokenHash, deviceId, accessTokenHash }
        let response;
        if (existingSession) {
            response = await this.sessionService.updateSession(existingSession.id, payload)
        } else {
            response = await this.sessionService.createSession(payload)
        }
        return {
            accessToken,
            refreshToken,
            refreshTokenExpiresAt: response.refreshTokenExpiresAt,
            accessTokenExpiresAt: response.accessTokenExpiresAt,
        }
    }

    async signup(data: SignupDto) {
        try {
            const passwordHash = await bcrypt.hash(data.password, 10)
            const payload = {
                email: data.email,
                phone: data.phone,
                passwordHash
            }
            const user = await this.usersService.createUser(payload)

            const tokens = await this.generateTokensAndSaveSession(user.id, data.deviceId)
            return {
                userId: user.id,
                authenticated: true,
                ...tokens,
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async signin(data: LoginDto) {
        const user = await this.usersService.getByEmail(data.email)
        if (!user) {
            throw new BadRequestException('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(data.password, user?.passwordHash!)
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials')
        }

        const tokens = await this.generateTokensAndSaveSession(user?.id!, data.deviceId)

        return {
            userId: user.id,
            authenticated: true,
            onboardingCompleted: user.onboardingCompleted,
            ...tokens,
        }
    }
}