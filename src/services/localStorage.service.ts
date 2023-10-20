export const getItem = (key: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    let item = localStorage.getItem(key);
    try {
      if (item && item != "undefined") {
        item = JSON.parse(item);
        return item;
      }
    } catch (error) {

    }
    return null;
  }
}

export const setItem = (key: string, data: any) => {
  if (typeof window !== "undefined" && window.localStorage) {
    let item = JSON.stringify(data);
    localStorage.setItem(key, item);
  }
}

export const deleteItem = (key: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem(key);
  }
}

export default {
  getItem,
  setItem,
  deleteItem
}
