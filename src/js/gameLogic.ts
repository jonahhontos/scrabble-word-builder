interface validationResult {
    valid: boolean,
    error?: string
}

function init() {
    console.log('Initializing game logic...');
}

function validatePlacedWord(placedWord: string): validationResult {
    if (placedWord.length < 2 || placedWord.length > 15) {
        return {valid: false, error: 'Placed word must be between 2 and 15 characters!'};
    }

    return { valid: true };
}

export default {
    init,
    validatePlacedWord,
}