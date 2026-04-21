import "server-only";

type TurnstileVerificationResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export function isTurnstileConfigured() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  return Boolean(
    siteKey &&
      secretKey &&
      !siteKey.includes("[YOUR-") &&
      !secretKey.includes("[YOUR-"),
  );
}

export async function verifyTurnstileToken(token: string, remoteIp?: string | null) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return {
      ok: false,
      error: "Captcha is not configured yet. Set TURNSTILE_SECRET_KEY first.",
    } as const;
  }

  if (!token) {
    return {
      ok: false,
      error: "Please complete the captcha challenge.",
    } as const;
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: false,
      error: "Captcha verification failed. Please try again.",
    } as const;
  }

  const result = (await response.json()) as TurnstileVerificationResponse;

  if (!result.success) {
    return {
      ok: false,
      error: "Captcha verification failed. Please try again.",
      codes: result["error-codes"] ?? [],
    } as const;
  }

  return { ok: true } as const;
}
