
export const imagePathFormat = (url) => {
    return url.replace('public/', 'storage/');
}

export const returnImage = (path) => window.location.origin + '/' + path;


export const scrollToView = (goTo) => {
    if (goTo.current) {
        goTo.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
};

export const scrollSmoothly = (top) => {
    window.scrollBy({
        top: top,
        behavior: 'smooth'
    });
};


export const 
function resetTimeToMidnight(date) {
    date.setHours(0, 0, 0, 0);
    return date;
}