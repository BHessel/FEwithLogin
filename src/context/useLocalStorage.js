import React, { useState } from 'react';

export const useLocalStorage = (key, value) => {

    console.log('useLocalStorage key', key);
    console.log('useLocalStorage value', value);

    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
  
        if (item) {
          return JSON.parse(item);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
          return value;
        }
      } catch (err) {
        return value;
      }
    });
  
    const setValue = (newValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (err) {}
      setStoredValue(newValue);
    };
  
    return [storedValue, setValue];

  };
  