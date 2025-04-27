const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const suspiciousSources = [
  "midjourney",
  "stable diffusion",
  "lexica",
  "dall-e",
  "openai",
  "dreambooth",
  "disco diffusion",
  "waifu diffusion",
  "runwayml",
  "novelai",
  "craiyon",
  "deepai",
  "bing image creator",
  "bluewillow",
  "nightcafe",
  "starryai",
  "artbreeder",
  "thispersondoesnotexist",
  "ai generated",
  "ai art",
  "synthetic media",
  "gan generated",
  "diffusion model",
  "stable-diffusion",
  "prompt engineering",
  "text-to-image",
  "ai content",
  "machine generated",
  "neural network image"
];

async function webDetectionScan(imageBuffer) {
    try {
        const [result] = await client.webDetection({ image: { content: imageBuffer } });
        const webDetection = result.webDetection;

        if (!webDetection) {
            console.log("No web detection data found.");
            return { aiSuspicionScore: 0 };
        }

        console.log("Web detection results:", webDetection);

        let score = 0;

        if (webDetection.webEntities) {
            for (const entity of webDetection.webEntities) {
                if (entity.description) {
                    const desc = entity.description.toLowerCase();
                    if (suspiciousSources.some(source => desc.includes(source))) {
                        score += 30;
                        break;
                    }
                }
            }
        }

        if (webDetection.pagesWithMatchingImages) {
            for (const page of webDetection.pagesWithMatchingImages) {
                if (page.url) {
                    const url = page.url.toLowerCase();
                    if (suspiciousSources.some(source => url.includes(source))) {
                        score += 30;
                        break;
                    }
                }
            }
        }

        if (webDetection.partialMatchingImages) {
            for (const partial of webDetection.partialMatchingImages) {
                if (partial.url) {
                    const url = partial.url.toLowerCase();
                    if (suspiciousSources.some(source => url.includes(source))) {
                        score += 40;
                        break;
                    }
                }
            }
        }
        
        if (score > 100) score = 100;

        return { aiSuspicionScore: score };
    } catch (error) {
        console.error("Web detection scan failed:", error);
        return { aiSuspicionScore: 0 }; // Fail safe
    }
}

module.exports = { webDetectionScan };
