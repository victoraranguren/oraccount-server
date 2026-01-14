import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MaybeAccount } from '@solana/kit';
import { OracleAccount } from './oracle/codama-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Promise<MaybeAccount<OracleAccount, string>[]> {
    return this.appService.getHello();
  }


  @Post()
  async updateOracleAccount() {
    return this.appService.updateAccount()
  }
}
