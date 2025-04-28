

// src/utils/webScan.js
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // remove "data:image/jpeg;base64," etc.
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  
  // Hugging Face API call
  export async function webDetectionScan(file) {
    const base64 = await fileToBase64(file);
  
    const response = await fetch("https://api-inference.huggingface.co/models/Ateeqq/ai-vs-human-image-detector", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: base64
      }),
    });
  
    if (!response.ok) {
      console.error("Hugging Face API error:", await response.text());
      return { aiSuspicionScore: 0 }; // fallback if something breaks
    }
  
    const result = await response.json();
    console.log("Hugging Face API result:", result);
  
    // Now extract score
    if (Array.isArray(result) && result.length > 0) {
      const aiLabel = result.find(label => label.label.toLowerCase().includes("ai"));
      if (aiLabel) {
        const score = aiLabel.score || 0;
        return { aiSuspicionScore: Math.round(score * 100) };
      }
    }
  
    return { aiSuspicionScore: 0 };
  }
  
