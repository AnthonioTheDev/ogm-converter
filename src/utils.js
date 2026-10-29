function normalizeTimecode(timeStr) {
    const parts = timeStr.trim().split(':');
    let hours = '00', minutes = '00', seconds = '00';

    if (parts.length === 2) {
        // Format: MM:SS or M:SS
        minutes = parts[0].padStart(2, '0');
        seconds = parts[1].padStart(2, '0');
    } else if (parts.length === 3) {
        // Format: HH:MM:SS or H:MM:SS
        hours = parts[0].padStart(2, '0');
        minutes = parts[1].padStart(2, '0');
        seconds = parts[2].padStart(2, '0');
    } else {
        throw new Error(`Invalid time format: ${timeStr}`);
    }

    return `${hours}:${minutes}:${seconds}.000`;
}

module.exports = {
    normalizeTimecode
}