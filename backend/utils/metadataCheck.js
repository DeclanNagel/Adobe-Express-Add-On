const exifr = require('exifr');

async function checkMetadata(imageBuffer) {
    try {
        const metadata = await exifr.parse(imageBuffer);

        if (!metadata) {
            console.log("No metadata found.");
            return { isAIGenerated: false };
        }

        // Turn metadata into lowercase string to search
        const metadataString = JSON.stringify(metadata).toLowerCase();

        // Common AI generator hints
        const aiHints = [
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
        
        const isAIGenerated = aiHints.some(hint => metadataString.includes(hint));

        console.log("Metadata scan complete. AI-generated:", isAIGenerated);
        return { isAIGenerated };
    } catch (error) {
        console.error("Metadata parsing error:", error);
        return { isAIGenerated: false };
    }
}

module.exports = { checkMetadata };
