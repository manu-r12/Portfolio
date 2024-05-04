
export const clipText = (text: string) => {
    const maxLength = 20; // Maximum length of clipped text
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
};
