import { secret_key } from "@/keys";
import * as CryptoJS from "crypto-js";

export const useDecrypt = (encryptedData: any) => {
  const decryptedBytes = CryptoJS.AES.decrypt(
    encryptedData,
    String(secret_key),
  );
  const decryptedData = decryptedBytes.toString();
  return decryptedData;
};
