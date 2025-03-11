"use client";
import { useState } from "react";
import styles from "./styles.module.css";

export default function Home({ freeDeals }: { freeDeals: Deal[] }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (error) {
      alert("Payment failed—try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Shein Deal Snap</h1>
        <p className={styles.subtitle}>Hot Shein deals, updated daily!</p>
      </header>

      <div className={styles.adBanner}>
        <p>Ad: Shop trendy accessories now!</p>
      </div>

      <section className={styles.deals}>
        {freeDeals.map((deal) => (
          <div key={deal.id} className={styles.dealCard}>
            <img src={deal.image} alt={deal.title} className={styles.dealImage} />
            <h3>{deal.title}</h3>
            <p>Code: <strong>{deal.code}</strong></p>
            <a href={deal.link} target="_blank" rel="noopener noreferrer" className={styles.shopButton}>
              Shop Now
            </a>
          </div>
        ))}
      </section>

      <div className={styles.unlockSection}>
        <p>Unlock 10+ exclusive deals for a one-time fee!</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={styles.emailInput}
          disabled={loading}
        />
        <button onClick={handlePay} className={styles.unlockButton} disabled={loading}>
          {loading ? "Processing..." : "Unlock Now - $5.99"}
        </button>
      </div>

      <footer className={styles.footer}>
        <p>Deals sourced from Shein promotions. Affiliate links may earn us a commission.</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const freeDeals = [
    { id: 1, title: "50% Off Dresses", code: "DRESS50", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/07/24/1690189811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 2, title: "20% Off Shoes", code: "SHOE20", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/08/17/1692252608eabf8a8ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 3, title: "Free Shipping", code: "FREESHIP", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/06/15/1686809811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
  ];
  return { props: { freeDeals } };
}

interface Deal {
  id: number;
  title: string;
  code: string;
  link: string;
  image: string;
}