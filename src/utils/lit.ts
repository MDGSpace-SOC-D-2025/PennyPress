import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { checkAndSignAuthMessage } from "@lit-protocol/auth-browser";
import { encryptFile, decryptToFile } from "@lit-protocol/encryption";

class Lit {
  public litNodeClient: LitNodeClient | null = null;
  private chain = "ethereum";

  async connect() {
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

    const authSig = await checkAndSignAuthMessage({
      chain: this.chain,
      nonce: await this.litNodeClient!.getLatestBlockhash(),
    });

    // Access Control: Allow anyone (for dev purposes)
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
  async decryptFile(
    ciphertext: string,
    dataToEncryptHash: string,
    accessControlConditions: any[],
    fileType: string 
  ): Promise<Blob> {
    
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

    // FIX: Cast 'decryptedData' to 'any' to bypass the 'ArrayBufferLike' mismatch
    return new Blob([decryptedData as any], { type: fileType });
  }
}

export const lit = new Lit();