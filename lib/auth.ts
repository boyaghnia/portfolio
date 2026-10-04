import crypto from "crypto";

/**
 * Validates a user-supplied passcode against authorized owner passcodes.
 * Best practice:
 * 1. Reads secrets strictly from server environment variables (never exposed to client).
 * 2. Uses timingSafeEqual to protect against timing-based side-channel attacks.
 * 3. Supports comma-separated passcodes in OWNER_PASSCODE, BLOG_ADMIN_PASSCODE, or GUESTBOOK_ADMIN_PASSCODE.
 */
export function verifyOwnerPasscode(inputPasscode?: string | null): boolean {
  if (!inputPasscode || typeof inputPasscode !== "string") {
    return false;
  }

  const trimmedInput = inputPasscode.trim();
  if (trimmedInput.length === 0) {
    return false;
  }

  // Collect authorized passcodes from environment variables
  const rawCodes = [
    process.env.OWNER_PASSCODE,
    process.env.BLOG_ADMIN_PASSCODE,
    process.env.GUESTBOOK_ADMIN_PASSCODE,
  ];

  const validCodes = new Set<string>();
  for (const raw of rawCodes) {
    if (raw) {
      raw.split(",").forEach((code) => {
        const clean = code.trim();
        if (clean) validCodes.add(clean);
      });
    }
  }

  // If no passcodes are configured in environment variables, reject authorization
  if (validCodes.size === 0) {
    console.warn(
      "[Auth Warning] No OWNER_PASSCODE or BLOG_ADMIN_PASSCODE configured in environment variables."
    );
    return false;
  }

  const inputBuffer = Buffer.from(trimmedInput);

  // Use timing-safe comparison for every valid code
  for (const validCode of validCodes) {
    const validBuffer = Buffer.from(validCode);
    if (inputBuffer.length === validBuffer.length) {
      if (crypto.timingSafeEqual(inputBuffer, validBuffer)) {
        return true;
      }
    }
  }

  return false;
}
