// src/utils/lit.ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { checkAndSignAuthMessage } from "@lit-protocol/auth-browser";
import { encryptFile } from "@lit-protocol/encryption"; 
import { decryptToFile } from "@lit-protocol/encryption";

class Lit {
  public litNodeClient: LitNodeClient | null = null;

  async connect() {
    // FIX: We use the raw string "datil-dev" instead of the Enum.
    // This bypasses the import error completely.
    const client = new LitNodeClient({
      litNetwork: "datil-dev", 
      debug: false
    });

    await client.connect();
    this.litNodeClient = client;
  }

  async encryptFile(file: File) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await checkAndSignAuthMessage({
      chain: "ethereum",
      nonce: await this.litNodeClient!.getLatestBlockhash(),
    });

    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
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
        chain: "ethereum",
      },
      this.litNodeClient!
    );

    return {
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
    };
  }

  async decryptFile(
    ciphertext: string, 
    dataToEncryptHash: string, 
    accessControlConditions: any
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await checkAndSignAuthMessage({
      chain: "ethereum",
      nonce: await this.litNodeClient!.getLatestBlockhash(),
    });

    // 3. Ask Lit Nodes to decrypt
    const decryptedFile = await decryptToFile(
      {
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain: "ethereum",
      },
      this.litNodeClient!
    );

    return decryptedFile;
  }
}
  


export const lit = new Lit();