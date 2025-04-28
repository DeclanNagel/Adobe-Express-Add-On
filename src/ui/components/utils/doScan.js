import { checkMetadata } from "./metadataCheck";
import { webDetectionScan } from "./webScan";

export async function doFullScan(file) {
  const metadata = await checkMetadata(file);
  const web = await webDetectionScan(file);

  let status = "safe";
  let reason = "No issues detected.";

  if (metadata.isAIGenerated) {
    status = "review";
    reason = "Possible AI generation detected from metadata.";
  }

  if (web.aiSuspicionScore >= 40) {
    status = "review";
    reason = `Possible AI generation detected by AI scanner (score: ${web.aiSuspicionScore}%)`;
  }

  return { status, reason, aiSuspicionScore: web.aiSuspicionScore, metadata };
}
