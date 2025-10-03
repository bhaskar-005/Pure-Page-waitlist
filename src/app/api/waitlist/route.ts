"use server"

import { NextResponse } from "next/server";
import fs from "fs";
import {UAParser} from "ua-parser-js";
import axios from "axios";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

const folder = path.dirname(DATA_FILE);
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true }); 
}

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

async function getGeo(ip: string) {
    try {
      const res = await axios.get(`http://ip-api.com/json/${ip}`);
      console.log(ip, res)
      return {
        country: res.data.country || "Unknown",
        region: res.data.regionName || "Unknown",
        city: res.data.city || "Unknown",
      };
    } catch (err) {
      return { country: "Unknown", region: "Unknown", city: "Unknown" };
    }
  }

  function readData() {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true }); // create folder if missing
      fs.writeFileSync(DATA_FILE, "[]"); // create empty JSON array
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  function writeData(data: any[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }
  

// POST API - submit waitlist info
export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for") || "";
    let ip = forwarded.split(",")[0].trim() || req.headers.get("x-real-ip") || "";

    const data = await req.json();
    const { email, note, utmSource, utmCampaign, screenWidth, screenHeight } = data;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const ua = UAParser(req.headers.get("user-agent") || "");
    const device = {
        browser: `${ua.browser.name || "Unknown"} ${ua.browser.version || ""}`.trim(),
        os: `${ua.os.name || "Unknown"} ${ua.os.version || ""}`.trim(),
        deviceType: ua.device.type || "Desktop", // fallback to Desktop if undefined
        language: req.headers.get("accept-language") || "Unknown",
        screenWidth: screenWidth || null,
        screenHeight: screenHeight || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
      };
      

    // Geolocation
    const location = await getGeo(ip);
    const referrer = req.headers.get("referer") || "Unknown";
    const timestamp = new Date().toISOString();

    const submission = {
      email,
      note: note || "",
      timestamp,
      ip,
      location,
      device,
      referrer,
      utm: {
        source: utmSource || "",
        campaign: utmCampaign || "",
      },
    };

    const existingData = readData();
    existingData.push(submission);
    writeData(existingData);

    return NextResponse.json({ message: "Submission successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET API - fetch all waitlist data (protected with password param)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password");

    if (password !== process.env.WAITLIST_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = readData();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
