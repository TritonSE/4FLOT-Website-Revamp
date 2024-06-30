import { deleteObject, getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

import { Field, GalleryData, ImageData, Page, TextData } from "../../../api/pageeditor";

/**
 * generateFieldMap
 *    Generates a mapping from field names to their index
 *    in the page.fields array. For example, if we wanted
 *    the field with the name "Image Gallery" :
 *
 *    const imageGalleryField = page.fields[map.get("Image Gallery")]
 *
 * @param page
 * @returns Map object
 */
export function generateFieldMap(page: Page) {
  const map = new Map<string, number>();
  page.fields.forEach((field, index) => {
    map.set(field.name, index);
  });
  return map;
}

/**
 * generatePageMap
 *    Generates a mapping from field names to the data that they
 *    hold. For example, if `const map = generatePageMap(page)`,
 *    then `map.get("Body Text")` would return the associated text.
 *
 * @param page Page object to generate map for
 * @returns Map object
 */
export function generatePageMap(page: Page) {
  const map = new Map<string, string | string[]>();

  page.fields.forEach((f: Field) => {
    const name = f.name;
    if (f.type === "text") {
      const text = (f.data as TextData).text;
      map.set(name, text);
    } else if (f.type === "image") {
      const image = (f.data as ImageData).image;
      map.set(name, image);
    } else if (f.type === "gallery") {
      const images = (f.data as GalleryData).images;
      map.set(name, images);
    }
  });

  return map;
}

/**
 * sanitizeFilename
 *    Takes a string and parses it to be friendly
 *    as a filename for Firebase storage
 * @param s
 * @returns
 */
export function sanitizeFilename(s: string) {
  const illegalRe = /[/?<>\\:*|"]/g; // illegal OS characters
  const controlRe = /\p{Cc}/gu; // remove unicode control codes
  const reservedRe = /^\.+$/; // reserved unix filenames
  const windowsRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i; // reserved windows filenames
  const trailDotRe = /[. ]+$/g; // remove trailing periods or spaces

  const sanitized = s
    .trim()
    .replace(/\s/g, "_") // spaces -> _
    .replace(illegalRe, "")
    .replace(controlRe, "")
    .replace(reservedRe, "")
    .replace(windowsRe, "")
    .replace(trailDotRe, "");

  if (sanitized.length >= 256) return sanitized.substring(0, 255);
  else return sanitized;
}

/**
 * deleteFile
 *    Deletes a file in Firebase storage
 *    by its download url
 * @param url
 */
export async function deleteFile(url: string) {
  const storage = getStorage();
  const imRef = ref(storage, url);

  await deleteObject(imRef);
}

/**
 * deleteFiles
 *    Deletes a string of files from Firebase storage
 *
 * @param urls
 */
export async function deleteFiles(urls: string[]) {
  await Promise.all(urls.map((url) => deleteFile(url)));
}

/**
 * createUniqueFilename
 *    Sanitizes fname string and checks against other
 *    files in the target folder for duplicate names.
 *
 * @param folder name of folder
 * @param fname file name of uploaded file
 * @returns unique and sanitized filename safe for upload
 */
export async function createUniqueFilename(folder: string, fname: string) {
  const storage = getStorage();
  const extRe = /(?=\.[^/.]+$)/g; // regex to split filename and extension
  const [origName, ext] = sanitizeFilename(fname).split(extRe);
  const listRef = ref(storage, folder);

  let count = 0;
  let fileName = origName;
  await listAll(listRef)
    .then((result) => {
      while (result.items.some((itemRef) => itemRef.name === `${fileName}${ext}`)) {
        fileName = `${origName}_${++count}`;
      }
    })
    .catch(console.error);

  return `${fileName}${ext}`;
}

/**
 * listAllUrls
 *    List all image URLs in a given folder.
 *
 * @param folder folder name
 * @returns string[] of urls
 */
export async function listAllUrls(folder: string) {
  const storage = getStorage();
  const listRef = ref(storage, folder);

  const urls = await Promise.all(
    (await listAll(listRef)).items.map((item) => {
      return getDownloadURL(item);
    }),
  );

  return urls;
}
