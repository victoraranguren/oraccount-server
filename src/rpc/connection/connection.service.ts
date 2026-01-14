import { Injectable, OnModuleInit } from "@nestjs/common";
import { connect, Connection } from "node_modules/solana-kite/dist";

@Injectable()
export class ConnectionRPC implements OnModuleInit {
    private connection: Connection;

    onModuleInit() {
        this.connection = connect('localnet')
        console.log('Solana connection initialized');

    }

    getConnection(): Connection {
        if (!this.connection) {
            this.connection = connect('localnet')
        }

        return this.connection
    }
}