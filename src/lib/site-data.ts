import { BarChart3, BellRing, Gamepad2, Gift, Headphones, Image, MessageSquareText, Mic2, Radio, Shield, Sparkles, TicketCheck, Volume2 } from "lucide-react";

export const features = [
  { icon: Shield, label: "Protection", title: "Moderation that acts early", text: "Automod, anti-nuke, anti-raid, action limits, and a complete case history keep staff in control." },
  { icon: Radio, label: "Connected", title: "Your favorite platforms", text: "Track TikTok, Last.fm, Spotify, Instagram, X, and GitHub without making members leave Discord." },
  { icon: Gamepad2, label: "Engagement", title: "Economy, games, and music", text: "Virtual currency, ranked blacktea, quick games, premium audio, and a full queue keep communities active." },
  { icon: BarChart3, label: "Analytics", title: "See how your server runs", text: "Message and voice charts, heatmaps, top channels, and member growth are generated directly in Discord." },
];

export const smallFeatures = [
  { icon: Sparkles, title: "Levels", text: "XP and rank progress for active members." },
  { icon: MessageSquareText, title: "Auto responders", text: "Automatic replies when a trigger phrase is detected." },
  { icon: Headphones, title: "Text to speech", text: "80+ voices for clips or live channel playback." },
  { icon: Gift, title: "Giveaways", text: "Run timed giveaways with clear entry rules and automatic winners." },
  { icon: BellRing, title: "Bump reminders", text: "Keep server promotion on schedule without manual reminders." },
  { icon: Image, title: "Image tools", text: "Create reactions, remove backgrounds, and transform media in chat." },
  { icon: TicketCheck, title: "Tickets", text: "Private support flows with panels, forms, access rules, and transcripts." },
  { icon: Mic2, title: "VoiceMaster", text: "Personal voice rooms members can rename, lock, hide, and transfer." },
  { icon: Volume2, title: "Premium audio", text: "High-quality playback, queue controls, autoplay, and sound filters." },
];

export const integrations = ["Last.fm", "Spotify", "Instagram", "X", "TikTok", "SoundCloud", "Pinterest", "GitHub"];