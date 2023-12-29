'use client';

// Local Storage
export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

// Session Storage
export const setSessionStorage = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const getSessionStorage = (key: string) => {
    return sessionStorage.getItem(key);
}