import { Injectable } from "@nestjs/common"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    generateAccessToken(userId: string, profileId: string | null = null) {
        return this.jwtService.sign({ sub: userId, profileId }, { expiresIn: '2h' })
    }

    generateRefreshToken(userId: string, profileId: string | null = null) {
        return this.jwtService.sign(
            {
                sub: userId,
                profileId
            },
            {
                expiresIn: '30d',
            },
        )
    }
}