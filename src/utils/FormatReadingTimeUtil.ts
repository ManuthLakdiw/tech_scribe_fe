export const formatReadingTime = (minutes: number): string => {
    const hours = Math.floor(Number(minutes) / 60);

    const remainingMinutes = Number(minutes) % 60;

    if (hours === 0) {
        return `${remainingMinutes} min read`;
    }

    if (remainingMinutes === 0) {
        return `${hours}h read`;
    }

    return `${hours}h ${remainingMinutes} min read`;
};

export default formatReadingTime;