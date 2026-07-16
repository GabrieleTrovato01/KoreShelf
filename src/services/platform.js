import { Capacitor } from '@capacitor/core';

// Restituisce true se l'app è in esecuzione nativa su Android o iOS
export const isMobilePlatform = () => {
    return Capacitor.isNativePlatform(); // Rileva se gira dentro la WebView di Android/iOS
};

// Restituisce la piattaforma corrente ('ios', 'android' o 'web')
export const getPlatformName = () => {
    return Capacitor.getPlatform();
};