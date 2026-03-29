/**
 * Simple PDF text extractor for digitally-generated PDFs.
 * Con Edison bills downloaded from coned.com are digitally generated,
 * meaning text is embedded as selectable text — no OCR needed.
 *
 * This extracts text by scanning for parenthesized strings in the PDF binary,
 * which is how most PDF generators encode visible text content.
 *
 * For a production system, you'd use a library like pdf.js or pdf-parse.
 * This lightweight version handles the common case without external dependencies.
 */

export interface ParsedBillData {
  totalAmount: number | null;
  kwhUsage: number | null;
  periodStart: string | null;
  periodEnd: string | null;
  found: {
    totalAmount?: boolean;
    kwhUsage?: boolean;
    dates?: boolean;
  };
}

export async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const str = new TextDecoder("latin1").decode(data);
        let text = "";

        // Extract parenthesized strings — primary text encoding in PDFs
        const parenRegex = /\(([^)]{1,200})\)/g;
        let match;
        while ((match = parenRegex.exec(str)) !== null) {
          const cleaned = match[1]
            .replace(/\\n/g, "\n")
            .replace(/\\r/g, "")
            .replace(/\\\(/g, "(")
            .replace(/\\\)/g, ")")
            .replace(/\\\\/g, "\\");
          if (cleaned.trim().length > 0 && /[a-zA-Z0-9$.]/.test(cleaned)) {
            text += cleaned + " ";
          }
        }

        // Also check hex-encoded strings
        const hexRegex = /<([0-9A-Fa-f\s]+)>/g;
        while ((match = hexRegex.exec(str)) !== null) {
          const hex = match[1].replace(/\s/g, "");
          if (hex.length > 4 && hex.length < 400) {
            let decoded = "";
            for (let i = 0; i < hex.length; i += 2) {
              const charCode = parseInt(hex.substr(i, 2), 16);
              if (charCode >= 32 && charCode <= 126) {
                decoded += String.fromCharCode(charCode);
              }
            }
            if (decoded.trim().length > 1) {
              text += decoded + " ";
            }
          }
        }

        resolve(text);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function parseBillFromText(text: string): ParsedBillData {
  const result: ParsedBillData = {
    totalAmount: null,
    kwhUsage: null,
    periodStart: null,
    periodEnd: null,
    found: {},
  };

  const normalized = text.replace(/\s+/g, " ");

  // Total amount patterns
  const totalPatterns = [
    /total\s*(?:amount|charges?|due|bill)[\s:$]*(\d{1,4}[.,]\d{2})/i,
    /amount\s*due[\s:$]*(\d{1,4}[.,]\d{2})/i,
    /please\s*pay[\s:$]*(\d{1,4}[.,]\d{2})/i,
    /(\d{2,4}\.\d{2})\s*(?:total|amount\s*due)/i,
  ];
  for (const p of totalPatterns) {
    const m = normalized.match(p);
    if (m) {
      result.totalAmount = parseFloat(m[1].replace(",", ""));
      result.found.totalAmount = true;
      break;
    }
  }

  // kWh patterns
  const kwhPatterns = [
    /(\d{2,5})\s*kwh/i,
    /(\d{2,5})\s*kilowatt/i,
    /(?:usage|consumption|used)[\s:]*(\d{2,5})/i,
  ];
  for (const p of kwhPatterns) {
    const m = normalized.match(p);
    if (m) {
      const val = parseInt(m[1]);
      if (val >= 50 && val <= 9999) {
        result.kwhUsage = val;
        result.found.kwhUsage = true;
        break;
      }
    }
  }

  // Date range patterns
  const datePatterns = [
    /(\w{3,9}\s+\d{1,2},?\s+\d{4})\s*(?:to|-|through|–)\s*(\w{3,9}\s+\d{1,2},?\s+\d{4})/i,
    /(\d{1,2}\/\d{1,2}\/\d{2,4})\s*(?:to|-|through|–)\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
  ];
  for (const p of datePatterns) {
    const m = normalized.match(p);
    if (m) {
      const d1 = new Date(m[1]);
      const d2 = new Date(m[2]);
      if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
        result.periodStart = d1.toISOString().split("T")[0];
        result.periodEnd = d2.toISOString().split("T")[0];
        result.found.dates = true;
        break;
      }
    }
  }

  return result;
}
