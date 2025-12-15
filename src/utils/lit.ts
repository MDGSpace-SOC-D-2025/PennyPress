import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { checkAndSignAuthMessage } from "@lit-protocol/auth-browser";
import { encryptFile, decryptToFile } from "@lit-protocol/encryption";

class Lit {
  public litNodeClient: LitNodeClient | null = null;
  // We keep a reference to the specific chain we are using for signatures
  private chain = "ethereum"; 

  async connect() {
    // Prevent reconnecting if already connected
    if (this.litNodeClient) return;

    const client = new LitNodeClient({
      litNetwork: "datil-dev",
      debug: false
    });

    await client.connect();
    this.litNodeClient = client;
  }

  // --- 1. ENCRYPTION (Write) ---
  async encryptFile(file: File) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    // 1. Get the User's Signature (AuthSig)
    const authSig = await checkAndSignAuthMessage({
      chain: this.chain,
      nonce: await this.litNodeClient!.getLatestBlockhash(),
    });

    // 2. Define Access Control Conditions (The Rule)
    // TODO: Week 3 - We will change this to check your zkSync contract!
    // Current Rule: "User must have >= 0 ETH on Ethereum" (Allows everyone for testing)
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: this.chain,
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "0",
        },
      },
    ];

    // 3. Encrypt the file
    const { ciphertext, dataToEncryptHash } = await encryptFile(
      {
        file,
        accessControlConditions,
        authSig,
        chain: this.chain,
      },
      this.litNodeClient!
    );

    return {
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
    };
  }

  // --- 2. DECRYPTION (Read) ---
  // THIS WAS MISSING
  async decryptFile(
    ciphertext: string,
    dataToEncryptHash: string,
    accessControlConditions: any[],
    fileType: string
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await checkAndSignAuthMessage({
      chain: this.chain,
      nonce: await this.litNodeClient!.getLatestBlockhash(),
    });

    const decryptedData = await decryptToFile(
      {
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain: this.chain,
      },
      this.litNodeClient!
    );

    // FIX IS HERE: Cast to 'any' to satisfy TypeScript
    // The browser knows how to handle this Uint8Array perfectly fine.
    return new Blob([decryptedData as any], { type: fileType });
  }
}

export const lit = new Lit();