const vision = require('@google-cloud/vision');


const client = new vision.ImageAnnotatorClient();

async function moderateContent(imageBuffer) {
    try {
        const [result] = await client.safeSearchDetection({ image: { content: imageBuffer } });
        const safeSearch = result.safeSearchAnnotation;

        console.log("SafeSearch results:", safeSearch);

        const unsafeLikelihoods = ["LIKELY", "VERY_LIKELY"];

        const isAdult = unsafeLikelihoods.includes(safeSearch.adult);
        const isViolence = unsafeLikelihoods.includes(safeSearch.violence);
        const isRacy = unsafeLikelihoods.includes(safeSearch.racy);
        const isMedical = unsafeLikelihoods.includes(safeSearch.medical);

        const isOffensive = isAdult || isViolence || isRacy || isMedical;

        return { isOffensive };
    } catch (error) {
        console.error("SafeSearch scan failed:", error);
        return { isOffensive: false }; // Safe fallback if scan fails
    }
}

module.exports = { moderateContent };
