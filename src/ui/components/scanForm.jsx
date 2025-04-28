import React, { useState } from "react";
import { doFullScan } from "/utils/doFullScan";

export default function ScanForm() {
  const [file, setFile]       = useState(null);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const onClickScan = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const scanResult = await doFullScan(file);
      setResult(scanResult);
    } catch (err) {
      console.error(err);
      alert("Scan failed – check console for details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, textAlign: "center" }}>
      <input type="file" accept="image/*" onChange={onChange} />
      <button
        onClick={onClickScan}
        disabled={!file || loading}
        style={{ marginLeft: 8 }}
      >
        {loading ? "Scanning…" : "Scan Image"}
      </button>

      {result && (
        <div style={{ marginTop: 24, textAlign: "left" }}>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Reason:</strong> {result.reason}</p>
          <p><strong>AI Suspicion:</strong> {result.aiSuspicionScore}%</p>
          <details style={{ maxHeight: 200, overflow: "auto" }}>
            <summary>View EXIF Metadata</summary>
            <pre>{JSON.stringify(result.metadata, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
 