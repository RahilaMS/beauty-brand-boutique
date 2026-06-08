import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import logoImg from "@/assets/rumy-logo.png";
import heroImg from "@/assets/rumy-hero.jpg";
import pSerum from "@/assets/product-serum.jpg";
import pEye from "@/assets/product-eyecream.jpg";
import pLip from "@/assets/product-lip.jpg";
import pMask from "@/assets/product-mask.jpg";
import pCleanser from "@/assets/product-cleanser.jpg";
import pKit from "@/assets/product-kit.jpg";
import sFacial from "@/assets/service-facial.jpg";
import sSkincare from "@/assets/service-skincare.jpg";
import sHair from "@/assets/service-hair.jpg";
import sMakeup from "@/assets/service-makeup.jpg";
import sPackage from "@/assets/service-package.jpg";
import sPremium from "@/assets/service-premium.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rumy — Luxury Skincare & Beauty Artistry, Bengaluru" },
      { name: "description", content: "Rumy is a luxury beauty studio in Bengaluru offering bespoke facials, skincare rituals, hair artistry, and a premium product collection." },
      { property: "og:title", content: "Rumy — Redefine Your Radiance" },
      { property: "og:description", content: "Luxury skincare & beauty artistry in the heart of Bengaluru." },
    ],
  }),
  component: RumyWebsite,
});

const BRAND = {
  name: "Rumy",
  tagline: "Redefine Your Radiance",
  sub: "Luxury Skincare & Beauty Artistry",
  phone: "+91 98765 43210",
  email: "hello@rumybeauty.com",
  address: "12, Lavelle Road, Bengaluru, Karnataka 560001",
  hours: "Mon–Sat: 10 AM – 8 PM | Sun: 11 AM – 6 PM",
  instagram: "@rumybeauty",
  whatsapp: "https://wa.me/919876543210",
};

const NAV_LINKS = ["Home", "Services", "About", "Gallery", "Contact"] as const;

const SERVICES = [
  { icon: "✦", cat: "Facial Treatments", items: ["Hydra Facial", "24K Gold Facial", "Microdermabrasion", "Chemical Peel", "LED Therapy"], price: "From ₹2,500", img: sFacial },
  { icon: "✧", cat: "Skincare Solutions", items: ["Acne Management", "Pigmentation Therapy", "Anti-Aging Ritual", "Brightening Protocol", "Sensitive Skin Care"], price: "From ₹3,000", img: sSkincare },
  { icon: "❋", cat: "Hair Care", items: ["Keratin Treatment", "Hair Botox", "Scalp Treatment", "Deep Conditioning", "Colour & Highlights"], price: "From ₹1,800", img: sHair },
  { icon: "◈", cat: "Makeup Services", items: ["Bridal Makeup", "Party Glam", "Airbrush Finish", "Editorial Looks", "Skin-Prep Ritual"], price: "From ₹3,500", img: sMakeup },
  { icon: "❁", cat: "Beauty Packages", items: ["Bride-to-Be Package", "Monthly Glow", "Detox & Renew", "Head-to-Toe Luxury", "Seasonal Reset"], price: "From ₹6,500", img: sPackage },
  { icon: "◇", cat: "Premium Collections", items: ["Rumy Signature Serum", "Rose Gold Eye Cream", "Velvet Lip Elixir", "Renewal Face Mask", "Glow Ritual Kit"], price: "From ₹1,200", img: sPremium },
];

const TESTIMONIALS = [
  { name: "Priya Nair", role: "Skincare Enthusiast", text: "Rumy transformed my skin in just 4 sessions. The team is exceptional — they truly listen and customise every treatment. I've never felt more confident.", stars: 5 },
  { name: "Aishwarya Menon", role: "Bride", text: "My wedding makeup was absolutely flawless. Everyone asked who did it. The attention to detail and the luxury experience made the day even more special.", stars: 5 },
  { name: "Deepika Rao", role: "Regular Client", text: "I've tried many salons in Bengaluru, but Rumy is in a league of its own. The ambiance, the products, the expertise — it's pure luxury every single time.", stars: 5 },
  { name: "Meera Krishnan", role: "Skincare Coach", text: "As a beauty professional, I'm very selective. Rumy uses only the finest ingredients and the science behind every treatment is impressive. Highly recommend.", stars: 5 },
];

const GALLERY_ITEMS = [
  { label: "Hydra Glow Facial", cat: "Treatment" },
  { label: "Bridal Transformation", cat: "Makeup" },
  { label: "Studio Ambiance", cat: "Studio" },
  { label: "Skin Revival", cat: "Before & After" },
  { label: "Hair Artistry", cat: "Hair" },
  { label: "Gold Ritual", cat: "Treatment" },
  { label: "Editorial Look", cat: "Makeup" },
  { label: "Glow Results", cat: "Before & After" },
];

const PRODUCTS = [
  { name: "Rumy Signature Glow Serum", desc: "Hyaluronic acid + Vitamin C complex for luminous, plumped skin.", price: "₹2,800", badge: "Best Seller", img: pSerum },
  { name: "Rose Gold Eye Cream", desc: "24K gold peptides to reduce puffiness and restore youthful radiance.", price: "₹1,900", badge: "New", img: pEye },
  { name: "Velvet Lip Elixir", desc: "Nourishing lip treatment with squalane and rose extract.", price: "₹1,200", badge: null as string | null, img: pLip },
  { name: "Deep Renewal Face Mask", desc: "Weekly ritual mask with kaolin clay and niacinamide.", price: "₹1,600", badge: "Fan Fave", img: pMask },
  { name: "Micellar Cleansing Milk", desc: "Gentle, fragrance-free cleanse that melts away impurities.", price: "₹1,100", badge: null as string | null, img: pCleanser },
  { name: "Glow Ritual Kit", desc: "The complete Rumy morning ritual — serum, SPF, mist.", price: "₹4,500", badge: "Value Set", img: pKit },
];

const PALETTE: [string, string][] = [
  ["#f5e6d3", "#e8c9a0"],
  ["#e8d5c4", "#d4a9b5"],
  ["#f0e8e0", "#c9b8a8"],
  ["#e4d4c8", "#b8a098"],
  ["#f2e4d8", "#dcc0b0"],
  ["#ede0d4", "#c8a890"],
  ["#f6e8dc", "#e0c4b0"],
  ["#e8d8c8", "#d0b898"],
];

function StarRating({ count }: { count: number }) {
  return (
    <span style={{ color: "#c9a96e", letterSpacing: 2, fontSize: 13 }}>
      {"★".repeat(count)}
    </span>
  );
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "1.5rem auto", maxWidth: 200 }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,#c9a96e)" }} />
      <span style={{ color: "#c9a96e", fontSize: 10 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#c9a96e,transparent)" }} />
    </div>
  );
}

type CTAVariant = "primary" | "ghost" | "gold" | "light";
function CTAButton({ children, variant = "primary", onClick, style = {} }: { children: React.ReactNode; variant?: CTAVariant; onClick?: () => void; style?: React.CSSProperties }) {
  const base: React.CSSProperties = {
    padding: "14px 32px",
    fontSize: 13,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    border: "1px solid",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "inline-block",
  };
  const variants: Record<CTAVariant, React.CSSProperties> = {
    primary: { background: "#1a1a1a", color: "#f5ede0", borderColor: "#1a1a1a" },
    ghost: { background: "transparent", color: "#1a1a1a", borderColor: "#1a1a1a" },
    gold: { background: "#c9a96e", color: "#fff", borderColor: "#c9a96e" },
    light: { background: "transparent", color: "#f5ede0", borderColor: "#f5ede0" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

function ImagePlaceholder({ index = 0, style = {}, label, aspectRatio = "3/4" }: { index?: number; style?: React.CSSProperties; label?: string; aspectRatio?: string }) {
  const [a, b] = PALETTE[index % PALETTE.length];
  return (
    <div style={{
      background: `linear-gradient(145deg, ${a}, ${b})`,
      aspectRatio,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }} />
      {label && (
        <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8a7060", textTransform: "uppercase", textAlign: "center", padding: "0 12px", position: "relative" }}>
          {label}
        </span>
      )}
      <span style={{ fontSize: 24, marginTop: 8, opacity: 0.3, position: "relative" }}>✦</span>
    </div>
  );
}

function PhotoBlock({ src, alt, aspectRatio = "3/4", style = {} }: { src: string; alt: string; aspectRatio?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ width: "100%", aspectRatio, overflow: "hidden", position: "relative", ...style }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

type Page = (typeof NAV_LINKS)[number];

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "95vh", display: "flex", alignItems: "center",
        background: "linear-gradient(160deg, #fdf8f3 0%, #f5ede0 40%, #ede0d0 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "rgba(201,169,110,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 300, height: 300, borderRadius: "50%", background: "rgba(201,169,110,0.06)", pointerEvents: "none" }} />
        <div className="two-col" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", width: "100%" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 20, fontFamily: "'Cormorant Garamond', serif" }}>
              ✦ Luxury Beauty Studio — Bengaluru
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 300, lineHeight: 1.1, color: "#1a1a1a", margin: "0 0 24px", letterSpacing: "-0.02em" }}>
              Reveal Your<br />
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Luminous</em><br />
              Self
            </h1>
            <p style={{ fontSize: 17, color: "#6b5e54", lineHeight: 1.7, maxWidth: 420, marginBottom: 40, fontFamily: "Georgia, serif" }}>
              Where science meets artistry. Rumy curates bespoke beauty experiences for the discerning woman who values transformation, precision, and grace.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <CTAButton variant="primary" onClick={() => navigate("Contact")}>Book Appointment</CTAButton>
              <CTAButton variant="ghost" onClick={() => navigate("Services")}>Shop Now</CTAButton>
              <CTAButton variant="ghost" onClick={() => navigate("Contact")} style={{ borderColor: "#c9a96e", color: "#c9a96e" }}>Contact Us</CTAButton>
            </div>
            <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
              {[["500+", "Happy Clients"], ["8+", "Years Expert"], ["100%", "Natural Luxury"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#1a1a1a" }}>{n}</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8880", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: "100%", height: "100%", border: "1px solid rgba(201,169,110,0.25)", borderRadius: 2, transform: "rotate(2deg)" }} />
            <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", position: "relative" }}>
              <img src={heroImg} alt="Rumy Beauty Studio interior with marble vanity and warm gold lighting" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ position: "absolute", bottom: -24, left: -24, background: "#fff", padding: "16px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", borderLeft: "3px solid #c9a96e" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#1a1a1a" }}>✦ Award-Winning Studio 2024</div>
              <div style={{ fontSize: 11, color: "#9a8880", marginTop: 2, letterSpacing: "0.05em" }}>Best Luxury Beauty, Bengaluru</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: "#1a1a1a", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", animation: "marquee 20s linear infinite", color: "#c9a96e", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif" }}>
          {Array(6).fill(["Premium Skincare", "✦", "Luxury Facials", "✦", "Bridal Makeup", "✦", "Hair Artistry", "✦", "Beauty Rituals", "✦"]).flat().map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* Featured Services */}
      <section style={{ padding: "100px 32px", background: "#fdfaf6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>Our Expertise</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#1a1a1a", margin: 0 }}>
              Curated Beauty Services
            </h2>
            <GoldDivider />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {SERVICES.slice(0, 4).map((s, i) => (
              <div key={s.cat} style={{ background: "#fff", padding: 40, borderBottom: "2px solid transparent", transition: "all 0.3s", cursor: "pointer", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "#c9a96e"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                onClick={() => navigate("Services")}
              >
                <PhotoBlock src={s.img} alt={s.cat} aspectRatio="4/3" style={{ marginBottom: 24 }} />
                <div style={{ fontSize: 24, color: "#c9a96e", marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: "#1a1a1a", margin: "0 0 8px" }}>{s.cat}</h3>
                <p style={{ fontSize: 13, color: "#9a8880", marginBottom: 16, lineHeight: 1.6 }}>{s.items.slice(0, 3).join(" · ")}</p>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", color: "#c9a96e", fontFamily: "'Cormorant Garamond', serif" }}>{s.price}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <CTAButton variant="ghost" onClick={() => navigate("Services")}>View All Services</CTAButton>
          </div>
        </div>
      </section>

      {/* Brand Story Strip */}
      <section style={{ background: "#1a1a1a", padding: "100px 32px" }}>
        <div className="two-col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 20 }}>Our Philosophy</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 300, color: "#f5ede0", lineHeight: 1.2, margin: "0 0 28px" }}>
              Beauty is not a mask.<br /><em style={{ color: "#c9a96e" }}>It is your truth.</em>
            </h2>
            <p style={{ color: "#a09088", lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
              At Rumy, we believe every woman deserves to feel extraordinary in her own skin. Our treatments are not just procedures — they are rituals of self-discovery crafted with the world's finest ingredients and decades of collective expertise.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
              {[["Certified Experts", "Trained by global beauty academies"], ["Pure Ingredients", "Cruelty-free, ethically sourced"], ["Custom Protocols", "Tailored to your unique skin"], ["Lasting Results", "Clinically proven transformations"]].map(([t, d]) => (
                <div key={t} style={{ borderLeft: "2px solid #c9a96e", paddingLeft: 16 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#f5ede0", marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: 12, color: "#7a6e68" }}>{d}</div>
                </div>
              ))}
            </div>
            <CTAButton variant="light" onClick={() => navigate("About")}>Our Story</CTAButton>
          </div>
          <div>
            <PhotoBlock src={pKit} alt="The Rumy ritual kit on a marble tray" aspectRatio="1/1" />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section style={{ padding: "100px 32px", background: "#fdfaf6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>Premium Collections</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#1a1a1a", margin: 0 }}>Best Sellers</h2>
            <GoldDivider />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {PRODUCTS.map((p) => (
              <div key={p.name} style={{ background: "#fff", cursor: "pointer", transition: "transform 0.3s", position: "relative" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {p.badge && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: "#1a1a1a", color: "#c9a96e", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", zIndex: 2 }}>
                    {p.badge}
                  </div>
                )}
                <PhotoBlock src={p.img} alt={p.name} aspectRatio="1/1" />
                <div style={{ padding: "20px 16px" }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 500, color: "#1a1a1a", margin: "0 0 6px" }}>{p.name}</h4>
                  <p style={{ fontSize: 12, color: "#9a8880", margin: "0 0 12px", lineHeight: 1.5 }}>{p.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#1a1a1a", fontWeight: 600 }}>{p.price}</span>
                    <button style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", background: "transparent", border: "1px solid #1a1a1a", color: "#1a1a1a", padding: "6px 14px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif" }}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "100px 32px", background: "linear-gradient(135deg, #f5ede0, #ede0d0)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>Client Stories</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#1a1a1a", margin: "0 0 56px" }}>
            Transformations That Speak
          </h2>
          <div style={{ position: "relative", minHeight: 220 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ position: "absolute", inset: 0, opacity: i === activeTestimonial ? 1 : 0, transition: "opacity 0.8s ease", pointerEvents: i === activeTestimonial ? "auto" : "none" }}>
                <div style={{ fontSize: 48, color: "#c9a96e", fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 16, opacity: 0.4 }}>"</div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#3a2e28", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 24px" }}>
                  {t.text}
                </p>
                <StarRating count={t.stars} />
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "#1a1a1a" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#9a8880", letterSpacing: "0.05em" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, background: i === activeTestimonial ? "#c9a96e" : "#d4c0b0", border: "none", borderRadius: 4, cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "80px 32px", background: "#1a1a1a", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 16 }}>Stay in the Glow</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#f5ede0", margin: "0 0 16px" }}>
            Exclusive Beauty Secrets
          </h2>
          <p style={{ color: "#8a7e78", marginBottom: 32, fontSize: 14 }}>
            Subscribe for bespoke skincare rituals, early access to new treatments, and members-only offers curated just for you.
          </p>
          {subscribed ? (
            <div style={{ color: "#c9a96e", fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>
              ✦ Welcome to the Rumy circle, darling.
            </div>
          ) : (
            <div style={{ display: "flex", gap: 0, maxWidth: 420, margin: "0 auto" }}>
              <input
                type="email" placeholder="Your email address" value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,169,110,0.3)", borderRight: "none", color: "#f5ede0", fontSize: 14, outline: "none", fontFamily: "Georgia, serif" }}
              />
              <button onClick={() => email && setSubscribed(true)}
                style={{ padding: "14px 24px", background: "#c9a96e", color: "#fff", border: "1px solid #c9a96e", cursor: "pointer", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const cats = ["All", ...SERVICES.map(s => s.cat)];

  return (
    <div>
      <section style={{ padding: "140px 32px 80px", background: "linear-gradient(135deg, #fdf8f3, #f0e8dc)", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 16 }}>Rumy Beauty</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, color: "#1a1a1a", margin: "0 0 20px" }}>
          Services & Collections
        </h1>
        <GoldDivider />
        <p style={{ fontSize: 16, color: "#7a6e68", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Every treatment is a bespoke journey, crafted around the canvas of your unique skin and beauty goals.
        </p>
      </section>

      <section style={{ padding: "0 32px 60px", background: "#fdfaf6", position: "sticky", top: 72, zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", borderBottom: "1px solid #e8dcd0", paddingBottom: 0, display: "flex", gap: 0, overflowX: "auto" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveFilter(c)} style={{ padding: "16px 24px", background: "transparent", border: "none", borderBottom: `2px solid ${activeFilter === c ? "#c9a96e" : "transparent"}`, color: activeFilter === c ? "#c9a96e" : "#9a8880", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Cormorant Garamond', serif", transition: "all 0.3s" }}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 32px 100px", background: "#fdfaf6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 40 }}>
          {SERVICES.filter(s => activeFilter === "All" || s.cat === activeFilter).map((s, i) => (
            <div key={s.cat} style={{ background: "#fff" }}>
              <PhotoBlock src={s.img} alt={s.cat} aspectRatio="16/9" />
              <div style={{ padding: 36 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{s.cat}</h3>
                  <span style={{ fontSize: 20, color: "#c9a96e" }}>{s.icon}</span>
                </div>
                <div style={{ marginBottom: 24 }}>
                  {s.items.map(item => (
                    <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0e8e0" }}>
                      <span style={{ fontSize: 14, color: "#5a4e48" }}>{item}</span>
                      <span style={{ fontSize: 12, color: "#c9a96e" }}>→</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#c9a96e" }}>{s.price}</span>
                  <CTAButton variant="primary" onClick={() => navigate("Contact")} style={{ padding: "10px 24px", fontSize: 11 }}>
                    Book Now
                  </CTAButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 32px", background: "#1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>Shop Rumy</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: "#f5ede0", margin: 0 }}>Premium Collections</h2>
            <GoldDivider />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {PRODUCTS.map((p) => (
              <div key={p.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.15)", cursor: "pointer" }}>
                <PhotoBlock src={p.img} alt={p.name} aspectRatio="1/1" />
                <div style={{ padding: 20 }}>
                  {p.badge && <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", background: "#c9a96e", color: "#fff", padding: "3px 10px", marginBottom: 10, display: "inline-block" }}>{p.badge}</span>}
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#f5ede0", margin: "8px 0 6px" }}>{p.name}</h4>
                  <p style={{ fontSize: 12, color: "#7a7068", lineHeight: 1.5, margin: "0 0 14px" }}>{p.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#c9a96e" }}>{p.price}</span>
                    <button style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", border: "1px solid #c9a96e", color: "#c9a96e", padding: "6px 14px", cursor: "pointer" }}>Shop</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <section style={{ padding: "140px 32px 100px", background: "linear-gradient(160deg, #fdf8f3, #f0e8dc)" }}>
        <div className="two-col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 20 }}>Our Story</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, margin: "0 0 28px" }}>
              Born from a passion<br />for <em style={{ color: "#c9a96e" }}>authentic beauty</em>
            </h1>
            <p style={{ fontSize: 16, color: "#6b5e54", lineHeight: 1.8, marginBottom: 24 }}>
              Rumy was founded on a singular belief: that every woman possesses a beauty uniquely her own — and our purpose is simply to reveal it. What began as a small atelier in Bengaluru has grown into the city's most trusted luxury beauty studio.
            </p>
            <p style={{ fontSize: 15, color: "#8a7e78", lineHeight: 1.8 }}>
              With over eight years of crafting personalised beauty experiences, Rumy has become synonymous with transformation, trust, and the kind of luxury that feels deeply personal.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <PhotoBlock src={heroImg} alt="Inside the Rumy studio" aspectRatio="4/5" />
            <div style={{ position: "absolute", bottom: -20, right: -20, width: 160, height: 160, border: "1px solid rgba(201,169,110,0.3)" }} />
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 16 }}>Founder's Note</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#1a1a1a", margin: "0 0 32px" }}>
            The Rumy Promise
          </h2>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 40px" }} />
          <p style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#4a3e38", lineHeight: 1.9, fontStyle: "italic", marginBottom: 32 }}>
            "I created Rumy because I wanted a space where beauty wasn't defined by trends or filtered through a generic lens. I wanted a sanctuary where every woman could experience science-backed, results-driven care delivered with genuine warmth and artistry."
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#1a1a1a", fontWeight: 600 }}>— Ruma Iyer, Founder & Creative Director</div>
          <div style={{ fontSize: 12, color: "#9a8880", marginTop: 4, letterSpacing: "0.05em" }}>Certified Aesthetician · 12+ Years Experience</div>
        </div>
      </section>

      <section style={{ padding: "100px 32px", background: "#fdfaf6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "#1a1a1a", margin: 0 }}>Mission & Philosophy</h2>
            <GoldDivider />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {[
              { icon: "✦", title: "Our Mission", text: "To redefine beauty standards by offering personalised, science-based treatments that celebrate individuality and build lasting confidence." },
              { icon: "◈", title: "Our Vision", text: "A world where every woman walks into her day radiant, empowered, and entirely herself — unburdened by expectations, free in her glow." },
              { icon: "❁", title: "Our Values", text: "Integrity in every ingredient. Artistry in every touch. Honesty in every consultation. This is the Rumy standard." },
              { icon: "◇", title: "Our Promise", text: "We promise no shortcuts, no generic protocols. Just deeply personal care, premium expertise, and results that make you fall in love with your skin." },
            ].map(v => (
              <div key={v.title} style={{ padding: 36, background: "#fff", borderTop: "2px solid #c9a96e" }}>
                <div style={{ fontSize: 24, color: "#c9a96e", marginBottom: 20 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: "#1a1a1a", margin: "0 0 16px" }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: "#7a6e68", lineHeight: 1.8, margin: 0 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 32px", background: "#1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>The Artisans</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "#f5ede0", margin: 0 }}>Meet Our Experts</h2>
            <GoldDivider />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {[
              { name: "Ruma Iyer", role: "Founder & Lead Aesthetician" },
              { name: "Divya Sharma", role: "Senior Skin Therapist" },
              { name: "Kavya Nair", role: "Makeup Artist & Educator" },
              { name: "Preethi Rajan", role: "Hair & Scalp Specialist" },
            ].map((m, i) => (
              <div key={m.name} style={{ textAlign: "center" }}>
                <ImagePlaceholder index={i + 4} style={{ borderRadius: "50%", width: 160, height: 160, margin: "0 auto 20px" }} label={m.name} aspectRatio="1/1" />
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#f5ede0", margin: "0 0 6px" }}>{m.name}</h4>
                <p style={{ fontSize: 12, color: "#c9a96e", letterSpacing: "0.05em" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 32px", background: "#fdfaf6" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#1a1a1a", margin: "0 0 48px" }}>Certifications & Recognition</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {["CIDESCO Certified", "ITEC International", "Dermalogica Partner", "Guinot Alliance", "Best Luxury Studio 2024", "Cruelty-Free Certified"].map(c => (
              <div key={c} style={{ border: "1px solid #c9a96e", padding: "12px 24px", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b5e54" }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const cats = ["All", "Treatment", "Makeup", "Hair", "Studio", "Before & After"];

  return (
    <div>
      <section style={{ padding: "140px 32px 80px", background: "linear-gradient(135deg, #fdf8f3, #f0e8dc)", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 16 }}>Visual Journey</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, color: "#1a1a1a", margin: 0 }}>
          The Rumy Gallery
        </h1>
        <GoldDivider />
        <p style={{ fontSize: 16, color: "#7a6e68", maxWidth: 480, margin: "0 auto" }}>Real stories. Real transformations. A visual ode to the art of Rumy.</p>
      </section>

      <section style={{ padding: "40px 32px", background: "#fdfaf6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActiveFilter(c)} style={{ padding: "10px 24px", background: activeFilter === c ? "#1a1a1a" : "transparent", color: activeFilter === c ? "#c9a96e" : "#9a8880", border: `1px solid ${activeFilter === c ? "#1a1a1a" : "#d4c0b0"}`, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", fontFamily: "'Cormorant Garamond', serif" }}>
                {c}
              </button>
            ))}
          </div>

          <div style={{ columns: "3 280px", gap: 16 }}>
            {GALLERY_ITEMS.filter(g => activeFilter === "All" || g.cat === activeFilter).map((g, i) => (
              <div key={g.label + i} style={{ breakInside: "avoid", marginBottom: 16, position: "relative", overflow: "hidden", cursor: "pointer" }}
                onMouseEnter={e => { const ov = e.currentTarget.querySelector(".goverlay") as HTMLElement | null; if (ov) ov.style.opacity = "1"; }}
                onMouseLeave={e => { const ov = e.currentTarget.querySelector(".goverlay") as HTMLElement | null; if (ov) ov.style.opacity = "0"; }}
              >
                <ImagePlaceholder index={i} aspectRatio={i % 3 === 0 ? "3/4" : "4/3"} label={g.label} />
                <div className="goverlay" style={{ position: "absolute", inset: 0, background: "rgba(26,26,26,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#f5ede0", marginBottom: 4 }}>{g.label}</div>
                  <div style={{ fontSize: 10, color: "#c9a96e", letterSpacing: "0.2em", textTransform: "uppercase" }}>{g.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState<Record<string, string>>({ name: "", email: "", phone: "", service: "", message: "", date: "" });
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section style={{ padding: "140px 32px 80px", background: "linear-gradient(135deg, #fdf8f3, #f0e8dc)", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 16 }}>Visit Us</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, color: "#1a1a1a", margin: 0 }}>
          Book Your Experience
        </h1>
        <GoldDivider />
        <p style={{ fontSize: 16, color: "#7a6e68", maxWidth: 480, margin: "0 auto" }}>
          Your transformation awaits. Reach out and let's begin your Rumy journey.
        </p>
      </section>

      <section style={{ padding: "80px 32px 100px", background: "#fdfaf6" }}>
        <div className="two-col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80 }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 400, color: "#1a1a1a", margin: "0 0 40px" }}>Studio Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { icon: "◈", label: "Address", value: BRAND.address },
                { icon: "✦", label: "Hours", value: BRAND.hours },
                { icon: "❁", label: "Phone", value: BRAND.phone },
                { icon: "◇", label: "Email", value: BRAND.email },
                { icon: "❋", label: "Instagram", value: BRAND.instagram },
              ].map(info => (
                <div key={info.label} style={{ display: "flex", gap: 20 }}>
                  <div style={{ fontSize: 18, color: "#c9a96e", flexShrink: 0, marginTop: 2 }}>{info.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8880", marginBottom: 4 }}>{info.label}</div>
                    <div style={{ fontSize: 15, color: "#3a2e28", fontFamily: "Georgia, serif" }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, background: "#e8dcd0", height: 220, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>✦</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6b5e54" }}>12, Lavelle Road, Bengaluru</div>
                <div style={{ fontSize: 11, color: "#9a8880", marginTop: 4 }}>Click for directions →</div>
              </div>
            </div>

            <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, padding: "16px 24px", background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 14, fontFamily: "'Cormorant Garamond', serif" }}>
              <span style={{ fontSize: 20 }}>●</span>
              Chat on WhatsApp — Instant Booking
            </a>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 400, color: "#1a1a1a", margin: "0 0 40px" }}>Book an Appointment</h2>
            {sent ? (
              <div style={{ padding: 60, textAlign: "center", background: "#fff", border: "1px solid #e8dcd0" }}>
                <div style={{ fontSize: 40, color: "#c9a96e", marginBottom: 16 }}>✦</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#1a1a1a", margin: "0 0 12px" }}>Request Received</h3>
                <p style={{ color: "#7a6e68", fontSize: 15 }}>Thank you for reaching out. We'll confirm your appointment within 2 hours.</p>
              </div>
            ) : (
              <div style={{ background: "#fff", padding: 48, border: "1px solid #e8dcd0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  {([["name", "Full Name", "text"], ["phone", "Phone Number", "tel"]] as const).map(([k, p, t]) => (
                    <div key={k}>
                      <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9a8880", display: "block", marginBottom: 8 }}>{p}</label>
                      <input type={t} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0d4c8", fontSize: 14, color: "#3a2e28", outline: "none", background: "#fdfaf6", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9a8880", display: "block", marginBottom: 8 }}>Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0d4c8", fontSize: 14, color: "#3a2e28", outline: "none", background: "#fdfaf6", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9a8880", display: "block", marginBottom: 8 }}>Service</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0d4c8", fontSize: 14, color: "#3a2e28", outline: "none", background: "#fdfaf6", appearance: "none", boxSizing: "border-box" }}>
                      <option value="">Select a service</option>
                      {SERVICES.map(s => <option key={s.cat} value={s.cat}>{s.cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9a8880", display: "block", marginBottom: 8 }}>Preferred Date</label>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0d4c8", fontSize: 14, color: "#3a2e28", outline: "none", background: "#fdfaf6", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9a8880", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    placeholder="Tell us about your skin goals or any concerns..."
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0d4c8", fontSize: 14, color: "#3a2e28", outline: "none", background: "#fdfaf6", resize: "vertical", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
                </div>
                <CTAButton variant="primary" onClick={() => setSent(true)} style={{ width: "100%", textAlign: "center", display: "block" }}>
                  Confirm Appointment Request
                </CTAButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function RumyWebsite() {
  const [page, setPage] = useState<Page>("Home");
  const [scrolled, setScrolled] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (p: Page) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fdfaf6", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        input:focus, textarea:focus, select:focus { border-color: #c9a96e !important; }
        ::placeholder { color: #b0a098; }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      <div ref={topRef} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(253,248,243,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.2)" : "none",
        transition: "all 0.4s ease",
        padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <button onClick={() => navigate("Home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }} aria-label="Rumy home">
            <img src={logoImg} alt="Rumy" style={{ height: 36, width: "auto", display: "block" }} />
          </button>

          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => navigate(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
                color: page === l ? "#c9a96e" : "#5a4e48",
                fontFamily: "'Cormorant Garamond', serif",
                borderBottom: page === l ? "1px solid #c9a96e" : "1px solid transparent",
                paddingBottom: 2,
                transition: "all 0.3s",
              }}>
                {l}
              </button>
            ))}
            <CTAButton variant="gold" onClick={() => navigate("Contact")} style={{ padding: "10px 22px", fontSize: 11 }}>
              Book Now
            </CTAButton>
          </div>
        </div>
      </nav>

      <main style={{ animation: "fadeUp 0.5s ease" }}>
        {page === "Home" && <HomePage navigate={navigate} />}
        {page === "Services" && <ServicesPage navigate={navigate} />}
        {page === "About" && <AboutPage />}
        {page === "Gallery" && <GalleryPage />}
        {page === "Contact" && <ContactPage />}
      </main>

      {/* Footer */}
      <footer style={{ background: "#1a1a1a", padding: "80px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
            <div>
              <div style={{ marginBottom: 16, background: "rgba(245,237,224,0.92)", display: "inline-block", padding: "10px 16px" }}>
                <img src={logoImg} alt="Rumy" style={{ height: 32, width: "auto", display: "block" }} />
              </div>
              <p style={{ fontSize: 14, color: "#7a7068", lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
                Luxury beauty studio crafting bespoke skin and beauty experiences in the heart of Bengaluru.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {["In", "Fb", "Yt", "Wa"].map(s => (
                  <div key={s} style={{ width: 36, height: 36, border: "1px solid rgba(201,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 11, color: "#c9a96e", fontFamily: "'Cormorant Garamond', serif" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Facial Treatments", "Skincare Solutions", "Hair Care", "Makeup Services", "Beauty Packages"] },
              { title: "Information", links: ["About Rumy", "Our Team", "Gallery", "Certifications", "Blog"] },
              { title: "Visit", links: [BRAND.address.split(",")[0], "Bengaluru 560001", BRAND.phone, BRAND.email, BRAND.hours.split("|")[0]] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#f5ede0", marginBottom: 20, letterSpacing: "0.05em" }}>{col.title}</h4>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 13, color: "#7a7068", marginBottom: 10, cursor: "pointer", lineHeight: 1.5 }}
                    onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                    onMouseLeave={e => e.currentTarget.style.color = "#7a7068"}
                  >
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontSize: 12, color: "#5a5450" }}>© 2025 Rumy Beauty Studio. All rights reserved.</div>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => (
                <span key={l} style={{ fontSize: 12, color: "#5a5450", cursor: "pointer" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 200,
        width: 52, height: 52, borderRadius: "50%",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
        textDecoration: "none", fontSize: 22,
      }} aria-label="Chat on WhatsApp">
        <span style={{ color: "#fff" }}>✉</span>
      </a>
    </div>
  );
}
