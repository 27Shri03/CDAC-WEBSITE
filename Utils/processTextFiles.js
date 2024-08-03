// export default function processTextFiles(textFiles) {
//     return new Promise((resolve, reject) => {
//         const allLines = [];
//         let filesProcessed = 0;

//         textFiles.forEach((file) => {
//             const reader = new FileReader();

//             reader.onload = (event) => {
//                 const text = event.target.result;
//                 const lines = text.split('\n').filter(line => line.trim() !== '');
//                 allLines.push(...lines);

//                 filesProcessed++;
//                 if (filesProcessed === textFiles.length) {
//                     resolve(allLines);
//                 }
//             };

//             reader.onerror = (error) => {
//                 console.error('Error reading text file:', error);
//                 filesProcessed++;
//                 if (filesProcessed === textFiles.length) {
//                     resolve(allLines); // We still resolve to return partial results
//                 }
//             };

//             reader.readAsText(file);
//         });
//     });
// }

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