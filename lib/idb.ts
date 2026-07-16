import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface QuranDBSchema extends DBSchema {
  surahs: {
    key: string;
    value: any;
  };
  'surah-ayahs': {
    key: string;
    value: any;
  };
  reciters: {
    key: string;
    value: any;
  };
  tafsir: {
    key: string;
    value: any;
  };
  'adhkar-categories': {
    key: string;
    value: any;
  };
  adhkar: {
    key: string;
    value: any;
  };
}

const DB_NAME = 'quran-pwa-db';
const DB_VERSION = 1;

export const initDB = async (): Promise<IDBPDatabase<QuranDBSchema>> => {
  return openDB<QuranDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('surahs')) {
        db.createObjectStore('surahs');
      }
      if (!db.objectStoreNames.contains('surah-ayahs')) {
        db.createObjectStore('surah-ayahs');
      }
      if (!db.objectStoreNames.contains('reciters')) {
        db.createObjectStore('reciters');
      }
      if (!db.objectStoreNames.contains('tafsir')) {
        db.createObjectStore('tafsir');
      }
      if (!db.objectStoreNames.contains('adhkar-categories')) {
        db.createObjectStore('adhkar-categories');
      }
      if (!db.objectStoreNames.contains('adhkar')) {
        db.createObjectStore('adhkar');
      }
    },
  });
};

export const saveToIDB = async <StoreName extends 'surahs' | 'surah-ayahs' | 'reciters' | 'tafsir' | 'adhkar-categories' | 'adhkar'>(
  storeName: StoreName,
  key: string,
  data: any
) => {
  try {
    const db = await initDB();
    await db.put(storeName, data, key);
  } catch (error) {
    console.error(`Error saving to IDB (${storeName}):`, error);
  }
};

export const getFromIDB = async <StoreName extends 'surahs' | 'surah-ayahs' | 'reciters' | 'tafsir' | 'adhkar-categories' | 'adhkar'>(
  storeName: StoreName,
  key: string
) => {
  try {
    const db = await initDB();
    return await db.get(storeName, key);
  } catch (error) {
    console.error(`Error reading from IDB (${storeName}):`, error);
    return null;
  }
};
