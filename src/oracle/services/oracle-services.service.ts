import { connect } from "node_modules/solana-kite/dist";
import * as oracleClient from "../../oracle/codama-client/index"

class OracleService {

    public async getAccounts() {
        const connection = connect('localnet');
        const getOracleAccounts = connection.getAccountsFactory(oracleClient.ORACCOUNT_PROGRAM_PROGRAM_ADDRESS, oracleClient.ORACLE_ACCOUNT_DISCRIMINATOR, oracleClient.getOracleAccountDecoder());
        return getOracleAccounts
    }
}

export default OracleService