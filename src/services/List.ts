import { db } from "../libs/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export const addItem = async (value: string, categorie: string) => {
  await addDoc(collection(db, "list"), {
    value: value,
    categorie: categorie,
    done: false,
  });
};

export const getItems = async () => {
  const newQueryList = [] as any;
  const queryList = await getDocs(collection(db, "list"));

  queryList.forEach((item) => {
    newQueryList.push({ id: item.id, ...item.data() });
  });

  return newQueryList;
};

export const editItem = async (value: string, id: string) => {
  const docRef = doc(db, "list", id);

  await updateDoc(docRef, {
    value: value,
  });
};

export const toggleCheckbox = async (done: boolean, id: string) => {
  const docRef = doc(db, "list", id);

  await updateDoc(docRef, {
    done: done ? false : true,
  });
};

export const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, "list", id));
};

