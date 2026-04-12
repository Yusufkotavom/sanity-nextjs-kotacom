import { loadSanityEnv, createSanityWriteClient } from "./lib/sanity-page-guards.mjs";
import crypto from "crypto";

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  const pricingPlans = [
    {
      _key: crypto.randomUUID(),
      name: "Paket Starter",
      price: "Rp 500.000",
      description: "Perfect untuk bisnis baru mulai dari nol\n⏱️ 1-2 minggu pengerjaan",
      recommended: false,
      items: [
        "5 Halaman utama (Home, About, Services, Portfolio, Contact)",
        "Responsive Design (Mobile & Desktop)",
        "Modern UI/UX Design",
        "Contact Form dengan validasi",
        "Google Maps Integration",
        "WhatsApp Integration",
        "SEO Basic Optimization",
        "Fast Loading Speed",
        "SSL Certificate",
        "1 Tahun Hosting & Domain",
        "3 Bulan Support Gratis",
        "Training Penggunaan"
      ]
    },
    {
      _key: crypto.randomUUID(),
      name: "Paket Professional",
      price: "Rp 990.000",
      description: "Untuk bisnis yang berkembang dan butuh fitur lengkap\n⏱️ 2-3 minggu pengerjaan",
      recommended: true,
      items: [
        "10+ Halaman lengkap",
        "Custom Design Premium",
        "Advanced Animations",
        "E-commerce Lengkap",
        "Product Catalog Management",
        "Shopping Cart & Checkout",
        "Payment Gateway Integration",
        "Order Management System",
        "Admin Dashboard",
        "Content Management System",
        "Analytics & Reporting",
        "User Management",
        "Advanced SEO Optimization",
        "Social Media Integration",
        "Email Marketing Setup",
        "Marketplace Integration",
        "6 Bulan Support Premium",
        "Monthly Performance Reports",
        "Security Updates"
      ]
    },
    {
      _key: crypto.randomUUID(),
      name: "Paket Enterprise",
      price: "Rp 1.999.000",
      description: "Untuk kebutuhan khusus enterprise & custom development\n⏱️ 3-4 minggu pengerjaan",
      recommended: false,
      items: [
        "Full Custom Development",
        "Microservices Architecture",
        "Cloud Infrastructure Setup",
        "API Development & Integration",
        "Multi-user Management System",
        "Role-based Access Control",
        "Advanced Reporting Dashboard",
        "Data Analytics Integration",
        "Enterprise-grade Security",
        "CDN & Performance Optimization",
        "Backup & Disaster Recovery",
        "24/7 Monitoring & Alerts",
        "Dedicated Account Manager",
        "Priority Support 24/7",
        "1 Tahun Full Maintenance",
        "Monthly Strategy Consultation"
      ]
    }
  ];

  console.log(`Patching structured.pricingPlans for page-template-pembuatan-website...`);
  await client.patch("page-template-pembuatan-website").set({
    "structured.pricingPlans": pricingPlans
  }).commit();
  console.log("Pricing updated!");
}

main().catch(console.error);
