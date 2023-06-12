import {Account, ID, Client, Databases} from 'appwrite';
import {Config} from '../utils/config';

import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT = Config.APPWRITE_PROJECT!;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

export type CreateDocument = {
  databaseId: string;
  collectionId: string;
  data: any;
  permissions: string[];
};

type ListDocuments = {
  databaseId: string;
  collectionId: string;
};

type UpdateDocument = {
  databaseId: string;
  collectionId: string;
  documentId: string;
  data: any;
  permissions: string[];
};

type DeleteDocument = {
  databaseId: string;
  collectionId: string;
  documentId: string;
};
class AppwriteService {
  account;
  database;

  constructor() {
    appwriteClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);

    this.account = new Account(appwriteClient);
    this.database = new Databases(appwriteClient);
  }

  //create a new user account in appwrite

  async createAccount({email, password, name}: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (userAccount) {
        //TODO
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: 'invalid email or password',
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite service :: createAccount() :: ' + error);
    }
  }

  async login({email, password}: LoginUserAccount) {
    try {
      const userAccount = await this.account.createEmailSession(
        email,
        password,
      );
      return userAccount;
    } catch (error) {
      Snackbar.show({
        text: 'invalid email or password',
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite service :: loginAccount() :: ' + error);
    }
  }

  async getCurrentUser() {
    try {
      const userAccount = await this.account.get();
      return userAccount;
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser() :: ' + error);
    }
  }

  async logout() {
    try {
      const userAccount = await this.account.deleteSession('current');
      return userAccount;
    } catch (error) {
      console.log('Appwrite service :: logout() :: ' + error);
    }
  }

  async createDocument({
    databaseId,
    collectionId,
    data,
    permissions,
  }: CreateDocument) {
    try {
      const document = await this.database.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data,
        permissions,
      );
      return document;
    } catch (error) {
      console.log('Appwrite service :: createDocument() :: ' + error);
    }
  }

  async listDocuments({databaseId, collectionId}: ListDocuments) {
    try {
      const documents = await this.database.listDocuments(
        databaseId,
        collectionId,
      );
      return documents;
    } catch (error) {
      console.log('Appwrite service :: listDocuments() :: ' + error);
    }
  }

  async updateDocument({
    databaseId,
    collectionId,
    documentId,
    data,
    permissions,
  }: UpdateDocument) {
    try {
      const document = await this.database.updateDocument(
        databaseId,
        collectionId,
        documentId,
        data,
        permissions,
      );
      return document;
    } catch (error) {
      console.log('Appwrite service :: updateDocument() :: ' + error);
    }
  }

  async deleteDocument({databaseId, collectionId, documentId}: DeleteDocument) {
    try {
      const document = await this.database.deleteDocument(
        databaseId,
        collectionId,
        documentId,
      );
      return document;
    } catch (error) {
      console.log('Appwrite service :: deleteDocument() :: ' + error);
    }
  }
}

export default AppwriteService;
