export type EncryptedResponse = {
  key: string;
  iv: string;
  data: string;
}

export type ServerCallBehavior = {
    doNotIncludeAccessToken?: boolean
}