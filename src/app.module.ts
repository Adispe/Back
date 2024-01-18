import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PredictionModule } from './prediction/prediction.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, PredictionModule, AuthModule, UsersModule],
})
export class AppModule {}
