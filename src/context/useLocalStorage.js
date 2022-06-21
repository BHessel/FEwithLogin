import { useState } from 'react';

export const useLocalStorage = (keyName, defaultValue) => {
    console.log('useLocal', keyName)
    console.log('useLocaldeffault', defaultValue)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName)
            if (value) {
                console.log('value', value)
                return JSON.parse(value)
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
                return defaultValue
            }
        } catch (err) {
            // return err
            return defaultValue
        }
    })

    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue))
        } catch (err) {
            setStoredValue(newValue)
        }
        return [storedValue, setValue]
        //should this be [storedValue, setStoredValue] ?
    }
}
