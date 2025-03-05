import AsyncStorage from '@react-native-async-storage/async-storage';

const DRAFTS_KEY = 'email_drafts';

export const getDrafts = async () => {
  try {
    const storedDrafts = await AsyncStorage.getItem(DRAFTS_KEY);
    return storedDrafts ? JSON.parse(storedDrafts) : [];
  } catch (error) {
    console.error('Error fetching drafts:', error);
    return [];
  }
};

export const saveDrafts = async (drafts: any) => {
  try {
    await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Error saving drafts:', error);
  }
};
