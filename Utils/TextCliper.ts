
export const clipText = (text: string) => {
    const maxLength = 20; 
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
};
