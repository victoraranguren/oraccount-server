# Oraccount Server

## Intro
Oraccount Server is the backend component for the Oraccount Oracle. It is a NestJS application that acts as an off-chain worker, updating a Solana PDA (Program Derived Address) with a random floating-point number at regular intervals via a Cron job. It also exposes a REST API to query the oracle status and trigger manual updates.

## Architecture

The server functionality is divided into:

1.  **Cron Job (`AppService`)**:
    -   Scheduled to run every 30 seconds (`*/30 * * * * *`).
    -   Automatically generates a random number and sends a transaction to the Solana network to update the Oracle Account.

2.  **REST API (`AppController`)**:
    -   `GET /`: Retrieves the list of Oracle Accounts and their current data.
    -   `POST /`: Triggers an immediate, manual update of the Oracle Account.

3.  **Oracle Service**:
    -   Handles the interaction with the Solana blockchain using `solana-kite` and `codama-client`.
    -   Manages wallet loading and transaction signing.

## Stack
-   **NestJS**: Main backend framework.
-   **TypeScript**: Programming language.
-   **Solana Kite / Codama**: Libraries for interacting with the Solana blockchain and the Anchor program.

## Requirements
-   [Node.js](https://nodejs.org/en/download/)
-   [pnpm](https://pnpm.io/installation)
-   A Solana Wallet (Keypair) with SOL for transaction fees.
-   Access to a Solana RPC node (e.g., Surfpool for local development).

## Usage

### 1. Setup and Installation

Install the project dependencies:

```bash
pnpm install
```

### 2. Configuration

Ensure you have your Solana wallet configured. The application expects a `WALLET` environment variable containing your **private key** in the form of a JSON array of numbers (e.g., `[1, 2, 3, ...]`).

This is the standard format used by the Solana CLI (usually found in `~/.config/solana/id.json`). You can copy the content of that file or use any other private key in this format.

Create a `.env` file (if not present) and configure:

```env
# Example configuration
WALLET=[87, 12, 231, ..., 9]
```

### 3. Running the Server

Start the server in development mode:

```bash
pnpm start:dev
```

The server will start (typically on port 3000), and you should see logs indicating the Cron job is initializing and running.

### 4. API Interaction

You can interact with the server using `curl` or any API client:

-   **Get Oracle Accounts:**
    ```bash
    curl http://localhost:3000/
    ```

-   **Force Oracle Update:**
    ```bash
    curl -X POST http://localhost:3000/
    ```

---
