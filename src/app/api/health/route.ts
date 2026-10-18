import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { dataDir, dataDirIsPlaceholder } from "@/lib/store";
import { smtpConfigured } from "@/lib/mailer";
import { adminConfigured } from "@/lib/auth";
import { paymentsEnabled } from "@/lib/payments";

export const dynamic = "force-dynamic";

export async function GET() {
  const dir = dataDir();
  let dataWritable = false;
  try {
    await fs.mkdir(dir, { recursive: true });
    const probe = path.join(dir, ".health");
    await fs.writeFile(probe, String(Date.now()));
    await fs.unlink(probe);
    dataWritable = true;
  } catch {}
  return NextResponse.json({
    status: dataWritable ? "ok" : "degraded",
    checks: {
      DATA_DIR_writable: dataWritable,
      DATA_DIR_custom: Boolean(process.env.DATA_DIR) && !dataDirIsPlaceholder(),
      DATA_DIR_placeholder: dataDirIsPlaceholder(),
      SMTP_configured: smtpConfigured(),
      ADMIN_configured: adminConfigured(),
      STRIPE_configured: paymentsEnabled(),
      STRIPE_live_mode: Boolean(process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_")),
      STRIPE_webhook_configured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    },
  });
}
