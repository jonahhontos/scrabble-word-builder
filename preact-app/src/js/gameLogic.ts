// Import the dictionary and letter data and process it into a more usable format for validation and scoring
import letterData from '../assets/letter_data.json';
import dictionaryText from '../assets/dictionary.txt?raw';

interface DictionaryEntry {
    word: string,
    points: number,
    letterCounts: Map<string, number>
}

// Process the dictionary text into an array of DictionaryEntry objects and a Set of valid words for quick lookup
let dictionary: DictionaryEntry[] = [];
let dictionaryWords: Set<string> = new Set(); // Set for quick lookup

dictionaryText.split('\n').forEach(entry => {
    const word = entry.trim().toUpperCase();
    if (word.length < 2 || word.length > 15 || !/^[a-zA-Z]+$/.test(word)) {
        console.warn(`Skipping invalid dictionary word: "${word}"`);
        return;
    }

    // Add up points and count letters for the word
    let points = 0;
    const letters = word.split('');
    letters.sort((a, b) => letterData[b]?.points - letterData[a]?.points); // Sort letters by points for faster rack validation
    const letterCounts = new Map<string, number>();

    for (const letter of letters) {
        points += letterData[letter]?.points || 0;
        letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
    }

    dictionary.push({ word, points, letterCounts });
    dictionaryWords.add(word);
});

// Sort the dictionary by points in descending order for better validation performance
dictionary.sort((a, b) => {
    if (a.points !== b.points){
        return b.points - a.points;
    }

    // If points are the same, sort by alphabetical order
    return a.word.localeCompare(b.word);
});



// Validator functions for placed words and rack tiles
interface validationResult {
    valid: boolean,
    error?: string
}

function checkTileLimits(words: string[]): boolean {
    const tileCounts = new Map<string, number>();
    
    for (const word of words) {
        for (const letter of word) {
            tileCounts.set(letter, (tileCounts.get(letter) || 0) + 1);
            if (tileCounts.get(letter)! > letterData[letter]?.count) {
                return false;
            }
        }
    }

    return true;
}

function validatePlacedWord(placedWord: string, rackTiles?: string): validationResult {
    const word = placedWord.trim().toUpperCase();
    if (!/^[a-zA-Z]+$/.test(word)) {
        return { valid: false, error: 'Placed word must only contain letters!' };
    }

    if (word.length === 1 || word.length > 15) {
        return { valid: false, error: 'Placed word must be between 2 and 15 characters!' };
    }

    if (!dictionaryWords.has(word)) {
        return { valid: false, error: 'Placed word is not in the dictionary!' };
    }

    if (!checkTileLimits([word, rackTiles || ''])) {
        return { valid: false, error: 'Placed word uses more tiles than are available!' };
    }

    return { valid: true };
}

function validateRackTiles(rackTiles: string, placedWord?: string): validationResult {
    const tiles = rackTiles.trim().toUpperCase();
    if (tiles.length < 1 || tiles.length > 7) {
        return { valid: false, error: 'Rack tiles must be between 1 and 7 characters!' };
    }

    if (!/^[a-zA-Z]+$/.test(tiles)) {
        return { valid: false, error: 'Rack tiles must only contain letters!' };
    }

    if (!checkTileLimits([tiles, placedWord || ''])) {
        return { valid: false, error: 'Rack uses more tiles than are available!' };
    }

    return { valid: true };
}


// Find the highest scoring valid word that can be formed with the given rack tiles and placed word
function calculateHighestScoringWord(rackTiles: string, placedWord: string): { word: string, points: number } | null {
    const letterPool = rackTiles.trim().toUpperCase() + placedWord.trim().toUpperCase();
    let letterPoolCounts = new Map<string, number>();

    for (const letter of letterPool) {
        letterPoolCounts.set(letter, (letterPoolCounts.get(letter) || 0) + 1);
    }

    // Dictionary is already sorted by points, so we can return the first valid word we find
    for (const entry of dictionary) {
        if (entry.word.length > (rackTiles.length + placedWord.length)) continue; // Skip words that are too long to be formed

        let canForm = true;
        for (const [letter, count] of entry.letterCounts) {
            if ((letterPoolCounts.get(letter) || 0) < count) {
                canForm = false;
                break;
            }
        }

        if (canForm) {
            return { word: entry.word, points: entry.points };
        }
    }

    // If we get here, no valid word was found
    return null;
}


export {
    validatePlacedWord,
    validateRackTiles,
    calculateHighestScoringWord
}