const fs = require("fs")
const path = require("path")
const { normalizeTimecode } = require("./utils.js")

function convertToOGM(inputFile, outputFile) {
    try {
        const data = fs.readFileSync(inputFile, 'utf-8');
        const lines = data.split(/\r?\n/);

        let ogmContent = '';
        let chapterIndex = 1;

        // Regex to match timestamp at the start, followed by whitespace and the title
        const lineRegex = /^([\d:]+)\s+(.+)$/;

        for (const line of lines) {
            const match = line.trim().match(lineRegex);

            if (match) {
                const timecode = normalizeTimecode(match[1]);
                const title = match[2].trim();

                // Pad chapter number with leading zero (e.g., 01, 02, ... 10)
                const chapterNum = chapterIndex.toString().padStart(2, '0');

                ogmContent += `CHAPTER${chapterNum}=${timecode}\n`;
                ogmContent += `CHAPTER${chapterNum}NAME=${title}\n`;

                chapterIndex++;
            }
        }

        fs.writeFileSync(outputFile, ogmContent, 'utf-8');
        console.log(`Successfully generated ${chapterIndex - 1} chapters in ${outputFile}`);

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// CLI Handling
const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Usage: node ogm-converter.js <input.txt> [output.txt]');
    process.exit(1);
}

const inputFile = path.resolve(args[0]);
// Default to 'chapters.txt' if no output file is provided
const outputFile = args[1] ? path.resolve(args[1]) : path.resolve('chapters.txt');

if (!fs.existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`);
    process.exit(1);
}

convertToOGM(inputFile, outputFile);
