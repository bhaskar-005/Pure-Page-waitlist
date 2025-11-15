"use server";

import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import axios from "axios";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let db: any = null;

async function connectDB() {
  if (db) return db;

  client = new MongoClient(process.env.DATABASE_URL!);
  await client.connect();

  db = client.db(); // uses the DB from the connection string
  return db;
}

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
    const db = await connectDB();
    const collection = db.collection("waitlist");

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

    const referrer = req.headers.get("referer") || "Unknown";
    const timestamp = new Date();

    await collection.insertOne({
      email,
      note: note || "",
      created_at: timestamp,
      ip,

      browser: `${browser.name || "Unknown"} ${browser.version || ""}`,
      os: `${os.name || "Unknown"} ${os.version || ""}`,
      device_type: deviceInfo.type || "Desktop",
      language: req.headers.get("accept-language") || "Unknown",

      screen_width: screenWidth || null,
      screen_height: screenHeight || null,
      timezone: timezone || "Unknown",

      referrer,
      utm_source: utmSource || "",
      utm_campaign: utmCampaign || "",
    });

    return NextResponse.json({ message: "Submission received" });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password");

    if (password !== process.env.WAITLIST_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    const collection = db.collection("waitlist");

    const data = await collection.find().sort({ created_at: -1 }).toArray();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Waitlist GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
