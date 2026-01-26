import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { checkAndSignAuthMessage } from "@lit-protocol/auth-browser";
import { encryptFile, decryptToFile } from "@lit-protocol/encryption";
import { CONTRACT_ADDRESS } from "@/constants";

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
  async encryptFile(file: File, articleId: string, creatorAddress: string) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await checkAndSignAuthMessage({
      chain: this.chain,
      nonce: await this.litNodeClient!.getLatestBlockhash(),
    });

    const accessControlConditions = [
      {
        // Condition 1: Check if caller is the article creator
        contractAddress: CONTRACT_ADDRESS,
        standardContractType: "",
        chain: "zkSyncTestnet", 
        method: "articles",
        parameters: [articleId], 
        returnValueTest: {
          comparator: "=",
          value: ":userAddress", // Special Lit syntax for msg.sender
          key: "creator" // Access the 'creator' field from the returned struct
        },
      },
      {
        operator: "or" 
      },
      {
        contractAddress: CONTRACT_ADDRESS,
        standardContractType: "",
        chain: "zkSyncTestnet",
        method: "hasAccess",
        parameters: [articleId, ":userAddress"], 
        returnValueTest: {
          comparator: "=",
          value: "true", 
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

    // Convert ArrayBuffer to Blob with correct MIME type
    return new Blob([decryptedData as any], { type: fileType });
  }

}



export const lit = new Lit();
