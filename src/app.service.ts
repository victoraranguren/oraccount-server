import { Injectable } from '@nestjs/common';
import { connect } from 'node_modules/solana-kite/dist';
import OracleService from './oracle/services/oracle-services.service';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const connection = connect('localnet');
    console.log("connection: ", connection);

    const wallet = await connection.loadWalletFromEnvironment("WALLET")
    console.log("wallet: ", wallet);

    const oraclesFn = await new OracleService().getAccounts()

    const oracles = await oraclesFn()

    console.log("oracles: ", oracles);

    return 'Hello World!';
  }
}
