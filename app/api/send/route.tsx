import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailTemplate } from "@/components/email/EmailTemplate";
import { render } from "@react-email/render";
import * as React from "react";

export async function POST(req: Request) {
  try {
    const { email, message, userName, subject } = await req.json();
    if (!email || !message) {
      return NextResponse.json(
        { message: "email and message are required" },
        { status: 400 }
      );
    }

    // Initialize nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Render the React template to HTML string
    const html = await render(
      <EmailTemplate message={message} userName={userName || "أخي الكريم"} />
    );

    // Send email using nodemailer
    await transporter.sendMail({
      from: `"منصة نور الهدى" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
    });

    return NextResponse.json({ message: "message sent successfully", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "error while sending message" },
      { status: 500 }
    );
  }
}