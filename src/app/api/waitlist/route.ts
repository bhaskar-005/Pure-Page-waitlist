"use server";

import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import axios from "axios";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
const geoCache = new Map<string, { country: string; region: string; city: string }>();

async function getGeo(ip: string) {
  if (geoCache.has(ip)) return geoCache.get(ip)!;
  try {
    const res = await axios.get(`http://ip-api.com/json/${ip}`);
    const location = {
      country: res.data.country || "Unknown",
      region: res.data.regionName || "Unknown",
      city: res.data.city || "Unknown",
    };
    geoCache.set(ip, location);
    return location;
  } catch (err) {
    return { country: "Unknown", region: "Unknown", city: "Unknown" };
  }
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for") || "";
    const ip = forwarded.split(",")[0].trim() || req.headers.get("x-real-ip") || "Unknown";

    const data = await req.json();
    const { email, note, utmSource, utmCampaign, screenWidth, screenHeight, timezone } = data;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

   
    const ua = new UAParser(req.headers.get("user-agent") || "");
    const browser = ua.getBrowser();
    const os = ua.getOS();
    const deviceInfo = ua.getDevice();

    const location = await getGeo(ip);
    const referrer = req.headers.get("referer") || "Unknown";
    const timestamp = new Date().toISOString();

    // Insert synchronously into DB
    await pool.query(
      `INSERT INTO waitlist (
        email, note, created_at, ip,
        country, region, city,
        browser, os, device_type,
        language, screen_width, screen_height,
        timezone, referrer, utm_source, utm_campaign
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [
        email,
        note || "",
        timestamp,
        ip,
        location.country,
        location.region,
        location.city,
        `${browser.name || "Unknown"} ${browser.version || ""}`,
        `${os.name || "Unknown"} ${os.version || ""}`,
        deviceInfo.type || "Desktop",
        req.headers.get("accept-language") || "Unknown",
        screenWidth || null,
        screenHeight || null,
        timezone || "Unknown",
        referrer,
        utmSource || "",
        utmCampaign || "",
      ]
    );

    return NextResponse.json({ message: "Submission received" });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET API - fetch all waitlist data (protected via header token)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password");


    if (password !== process.env.WAITLIST_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await pool.query(`SELECT * FROM waitlist ORDER BY created_at DESC`);

    return NextResponse.json({ data:  res.rows || [] });
  } catch (error) {
    console.error("Waitlist GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
