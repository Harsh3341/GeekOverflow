import {Account, ID, Client} from 'appwrite';
import Config from 'react-native-config';

import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    appwriteClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);

    this.account = new Account(appwriteClient);
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
        text: String(error),
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
        text: String(error),
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
}

export default AppwriteService;
