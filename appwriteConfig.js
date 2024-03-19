import { Client, Databases } from "appwrite";

export const PROJECT_ID = "65f9db97e5145115b6ae"
export const DATABASE_ID = "65f9dd035c084e7c77ff"
export const COLLECTION_ID = "65f9dd0af07873330b41"

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65f9db97e5145115b6ae");

  export const databases = new Databases(client);

export default client;
