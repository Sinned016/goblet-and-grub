import { storage } from "@/lib/firebaseClient";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const storageRef = ref(storage, `dishes/${Date.now()}-${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (err) {
    console.log("Error uploading picture ", err);
    return null;
  }
}
