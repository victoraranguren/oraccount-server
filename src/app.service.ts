import { Injectable, Post } from '@nestjs/common';
import { connect } from 'node_modules/solana-kite/dist';
import OracleService from './oracle/services/oracle-services.service';
import { MaybeAccount } from '@solana/kit';
import { OracleAccount } from './oracle/codama-client';
import { ConnectionRPC } from './rpc/connection/connection.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private readonly connectionRPC: ConnectionRPC) { }
  @Cron('*/30 * * * * *')
  async cronUpdateAccount() {
    console.log("init Cron");

    await this.updateAccount()

    console.log("update Cron");
  }
  async getHello(): Promise<MaybeAccount<OracleAccount, string>[]> {
    const oraclesFn = await new OracleService(this.connectionRPC).getAccounts()

    const oracles = await oraclesFn()

    console.log("oracles: ", oracles);

    return oracles;
  }

  async updateAccount() {
    return await new OracleService(this.connectionRPC).updateAccount()
  }
}
