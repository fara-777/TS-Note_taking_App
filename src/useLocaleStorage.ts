import { useEffect, useState } from "react";

// custom hooks
export function useLocaleStorage<T>(key: string, initialValue: T | (() => T)) {
  // state tanimlariz ilk degerini localStorage'den aliriz aliriz
  const [value, setValue] = useState<T>(() => {
    // loacalde saklanan degeri al
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  // useEffect kullanarak value her degistiginde locale kayit ediyoruz
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // bilesenlere dondurulecek deger ve fonksyon belirleme
  return [value, setValue] as [T, typeof setValue];
}
