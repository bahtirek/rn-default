import { Avatars, Client, Databases, Query } from 'react-native-appwrite';
import { Account, ID } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aora',
  projectId: '671e6cf4000f1a0ae611',
  databaseId: '671e8b93002b8190db57',
  userCollectionId: '671e8bc7000c70157486',
  videosCollectionId: '671e8be6002e520e58a2',
  storageId: '671e73d5001c0575966a'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async(email, password, username) => {

  try {
    const newAccount = await account.create(
      ID.unique(),
      email, 
      password, 
      username
    )
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username, 
        avatar: avatarUrl
      }
    );

    return newUser;

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async(email, password) => {
  try {
    const session = await account.createEmailPasswordSession(
      email, 
      password
    )
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const getCurrentUser = async() => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error;
    console.log(currentUser);
    
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const getAllPosts = async() => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId
    )
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}
