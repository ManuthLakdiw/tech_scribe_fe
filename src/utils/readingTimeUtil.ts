const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
        return `${remainingMinutes} min read`;
    }

    if (remainingMinutes === 0) {
        return `${hours}h read`;
    }

    return `${hours}h ${remainingMinutes} min read`;
};

/**
 * Content එකේ වචන ගණන් කරලා වෙලාව හදන function එක
 */
export const calculateReadingTime = (content: string): string => {
    if (!content || content.trim().length === 0) {
        return "0 min read";
    }

    const wordsPerMinute = 200;
    const charsPerMinute = 1000; // අකුරු වලින් ගණන් බලනවා නම් වේගය (Fallback speed)

    // Markdown symbols අයින් කිරීම
    const cleanText = content.replace(/[#*`~\[\]()_>!-]/g, ' ');

    // 1. වචන ගණන (Words Count)
    const wordCount = cleanText.trim().split(/\s+/).filter(word => word.length > 0).length;

    // 2. අකුරු ගණන (Characters Count)
    const charCount = cleanText.length;

    let time = 0;

    // --- SMART LOGIC ---
    // සාමාන්‍ය වචනයක දිග අකුරු 5-6ක් වගේ වෙන්නේ.
    // අපි බලනවා සාමාන්‍යයෙන් එක වචනයක අකුරු කීයක් තියෙනවද කියලා.
    const averageCharsPerWord = charCount / (wordCount || 1);

    // එක වචනයක අකුරු 10කට වඩා තියෙනවා නම්, ඒ කියන්නේ user spaces නැතුව type කරනවා (Keysmash).
    // එහෙම වෙලාවට අපි "අකුරු ගණන" පාවිච්චි කරනවා. නැත්නම් "වචන ගණන" පාවිච්චි කරනවා.
    if (averageCharsPerWord > 10) {
        time = Math.ceil(charCount / charsPerMinute);
    } else {
        time = Math.ceil(wordCount / wordsPerMinute);
    }

    return formatTime(time);
};