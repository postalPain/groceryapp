// import the original type declarations
import 'i18next';
import en from './en';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: 'en';
        // custom resources type
        resources: {
            en: typeof en['translation'];
        };
        // other
    }
}
