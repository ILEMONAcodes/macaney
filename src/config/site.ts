


//hey just in case you become the dev to take over from me,understand these
// Configuration Management (`src/config/site.ts`)

// Why this design?
//To ensure the Macaney digital platform remains secure, maintainable, and easy to update as we scale beyond the initial ebook landing page, all global assets and endpoints are managed through a centralized configuration file.

//Key Benefits:
//1. **Zero Hard-Coding:** Links like the WhatsApp community group and ebook asset paths are never scattered across component files. If a community link or support email changes, it is updated in one place.
//2. **Environment Agnostic (Dev vs. Production):** By leveraging `process.env` fallback patterns, the application automatically handles local development environments, Vercel preview deployments, and live production routes (`macaney.com`) without requiring code modifications.
//3. **Platform Scalability:** As we roll out future pages (`/commercial-bee-farm`, `/consultation`, `/courses`), every module will pull from this same core configuration, ensuring complete architectural consistency across the entire Macaney ecosystem.



export const siteConfig = {
  name: "Macaney Sustainable Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://macaney.com",
  links: {
    whatsappGroup: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/placeholder",
    ebookDownload: process.env.NEXT_PUBLIC_EBOOK_URL || "/assets/macaney-beginner-beekeeping-guide.pdf",
    supportEmail: "support@macaney.com",
    whatsappSupport: "https://wa.me/2348000000000",
  },
};











