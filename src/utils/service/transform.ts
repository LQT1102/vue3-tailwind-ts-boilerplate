import { stringify } from 'qs';
import FormData from 'form-data';
import { isArray, isFile } from '../common';

/**
 * Yêu cầu chuyển đổi dữ liệu
 * @param requestData - data
 * @param contentType - Type
 */
export async function transformRequestData(requestData: any, contentType?: UnionKey.ContentType) {
  // application/json 
  let data = requestData;
  //  
  if (contentType === 'application/x-www-form-urlencoded') {
    data = stringify(requestData);
  }
  // form-data 
  if (contentType === 'multipart/form-data') {
    data = await handleFormData(requestData);
  }

  return data;
}

async function handleFormData(data: Record<string, any>) {
  const formData = new FormData();
  const entries = Object.entries(data);

  entries.forEach(async ([key, value]) => {
    const isFileType = isFile(value) || (isArray(value) && value.length && isFile(value[0]));

    if (isFileType) {
      await transformFile(formData, key, value);
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}

/**
 *  
 * @param key -  
 * @param file -  
 */
async function transformFile(formData: FormData, key: string, file: File[] | File) {
  if (isArray(file)) {
    //  
    await Promise.all(
      (file as File[]).map(item => {
        formData.append(key, item);
        return true;
      })
    );
  } else {
    //  
    formData.append(key, file);
  }
}
