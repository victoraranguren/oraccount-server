import * as oracleClient from "../../oracle/codama-client/index"
import { ConnectionRPC } from "src/rpc/connection/connection.service";
import { address } from "@solana/kit";

class OracleService {

    constructor(private readonly connectionRPC: ConnectionRPC) { }

    public async getAccounts() {
        const connection = this.connectionRPC.getConnection()
        const getOracleAccounts = connection.getAccountsFactory(oracleClient.ORACCOUNT_PROGRAM_PROGRAM_ADDRESS, oracleClient.ORACLE_ACCOUNT_DISCRIMINATOR, oracleClient.getOracleAccountDecoder());

        const wallet = await connection.loadWalletFromEnvironment("WALLET")
        const oraclePDA = await connection.getPDAAndBump(oracleClient.ORACCOUNT_PROGRAM_PROGRAM_ADDRESS, ['oracle_account', address(wallet.address.toString())])
        console.log("oraclePDA", { oraclePDA });
        return getOracleAccounts
    }

    public async updateAccount() {
        const connection = this.connectionRPC.getConnection()
        const wallet = await connection.loadWalletFromEnvironment("WALLET")
        const oraclePDA = await connection.getPDAAndBump(oracleClient.ORACCOUNT_PROGRAM_PROGRAM_ADDRESS, ['oracle_account', address(wallet.address.toString())])

        console.log("oraclePDA", { oraclePDA });

        let getOracleAccounts = await connection.getAccountsFactory(oracleClient.ORACCOUNT_PROGRAM_PROGRAM_ADDRESS, oracleClient.ORACLE_ACCOUNT_DISCRIMINATOR, oracleClient.getOracleAccountDecoder());

        console.log("Antes de update: ", await getOracleAccounts());

        const feePayer = wallet;

        let max = 0;

        while (max < 1) {
            max = Number(Number(Math.random() * 100).toFixed())
        }

        const randomBigInt = BigInt(max);

        console.log("newValue: ", max);

        const updateAccountInstruction = await oracleClient.getUpdateOracleValueInstruction({ authority: wallet, newValue: randomBigInt, oracle: address("FAEaAFGD3XdYPADaMR3eQcgc488BdqTvZnqe6XDMGiU3") })

        const signature = await connection.sendTransactionFromInstructions({
            feePayer: feePayer,
            instructions: [updateAccountInstruction]
        })

        getOracleAccounts = await connection.getAccountsFactory(oracleClient.ORACCOUNT_PROGRAM_PROGRAM_ADDRESS, oracleClient.ORACLE_ACCOUNT_DISCRIMINATOR, oracleClient.getOracleAccountDecoder());

        console.log("Despues de update: ", await getOracleAccounts());

        return {
            success: true,
            signature
        }
    }
}

export default OracleService