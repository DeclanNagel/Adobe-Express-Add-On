const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { checkMetadata } = require('./utils/metadataCheck');
const { moderateContent } = require('./utils/contentModeration');
const { webDetectionScan } = require('./utils/webScan');


const app = express();
const upload = multer(); 
const port = 5241; 


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/scan', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log("✅ Received file:", req.file.originalname);

    try {
        const imageBuffer = req.file.buffer;

        const metadataResult = await checkMetadata(imageBuffer);
        const moderationResult = await moderateContent(imageBuffer);
        const webResult = await webDetectionScan(imageBuffer); 


        let status = "safe";
        let reason = "No issues detected.";

        if (metadataResult.isAIGenerated) {
            status = "review";
            reason = "Possible AI generation detected (metadata scan).";
        }


        if (webResult.aiSuspicionScore >= 40) { 
            status = "review";
            reason = `Possible AI generation detected (web scan, suspicion score ${webResult.aiSuspicionScore}%)`;
        }

        //if (moderationResult.isOffensive) {
        //    status = "unsafe";
        //    reason = "Offensive content detected (SafeSearch).";
       // }

        res.json({ 
            status, 
            reason, 
            aiSuspicionScore: webResult.aiSuspicionScore 
        });
    } catch (error) {
        console.error("Error during full scan:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.listen(port, () => {
  console.log(`✅ Amazing! Backend server running at http://localhost:${port}`);
});
