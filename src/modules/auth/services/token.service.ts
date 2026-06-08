import { Injectable } from "@nestjs/common"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    generateAccessToken(userId: string) {
        return this.jwtService.sign({ sub: userId }, { expiresIn: '2h' })
    }

    generateRefreshToken(userId: string) {
        return this.jwtService.sign(
            {
                sub: userId,
            },
            {
                expiresIn: '30d',
            },
        )
    }
}