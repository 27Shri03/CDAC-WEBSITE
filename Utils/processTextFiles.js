export default function processSingleTextFile(textFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target.result;
            const sentences = text.split('\n').filter(sentence => sentence.trim() !== '');
            resolve(sentences);
        };

        reader.onerror = (error) => {
            console.error('Error reading text file:', error);
            reject(error);
        };

        reader.readAsText(textFile);
    });
}