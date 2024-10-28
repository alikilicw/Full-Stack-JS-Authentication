import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from 'src/user/user.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { mailConfig } from './otp/otp.config'
import { OtpService } from './otp/otp.service'

@Module({
    imports: [UserModule, MailerModule.forRoot(mailConfig)],
    providers: [AuthService, OtpService],
    controllers: [AuthController]
})
export class AuthModule {}
