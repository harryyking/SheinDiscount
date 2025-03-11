import styles from "../styles.module.css";

export default function Unlocked() {
  const allDeals = [
    { id: 1, title: "50% Off Dresses", code: "DRESS50", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/07/24/1690189811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 2, title: "20% Off Shoes", code: "SHOE20", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/08/17/1692252608eabf8a8ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 3, title: "Free Shipping", code: "FREESHIP", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/06/15/1686809811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 4, title: "60% Off Swimwear", code: "SWIM60", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/05/24/1690189811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 5, title: "30% Off Tops", code: "TOP30", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/08/10/1691654321e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 6, title: "Buy 1 Get 1 Free", code: "BOGO", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/07/20/1690189811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 7, title: "15% Off Everything", code: "EXTRA15", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/06/25/1690189811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 8, title: "40% Off Accessories", code: "ACC40", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/08/05/1691254321e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 9, title: "$5 Graphic Tees", code: "TEE5", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/07/15/1690189811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
    { id: 10, title: "25% Off Outerwear", code: "COAT25", link: `https://us.shein.com?aff_id=${process.env.SHEIN_AFFILIATE_ID}`, image: "https://img.ltwebstatic.com/images3_pi/2023/06/30/1690189811e5ebfaaf5f8e5eecfefedae618b47e2e_thumbnail_720x.webp" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Unlocked Deals!</h1>
        <p className={styles.subtitle}>Your exclusive Shein savings start here.</p>
      </header>

      <div className={styles.adBanner}>
        <p>Ad: Get the latest fashion accessories!</p>
      </div>

      <section className={styles.deals}>
        {allDeals.map((deal) => (
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

      <footer className={styles.footer}>
        <p>Deals sourced from Shein promotions. Affiliate links may earn us a commission.</p>
      </footer>
    </div>
  );
}