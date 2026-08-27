const db = require("../models");

const DEFAULT_SEO = {
    title: "ASSIPL | Automation Systems and Solutions (India) Pvt. Ltd.",
    description: "Integrated Security Solutions for BFSI, IT Parks, Industries, and Critical Infrastructure.",
};

const resolveMediaUrl = (siteUrl, value = "") => {
    const textValue = String(value || "").trim();

    if (!textValue) return "";
    if (textValue.startsWith("http") || textValue.startsWith("data:")) return textValue;

    return `${siteUrl}/${textValue.replace(/^\//, "")}`;
};

const withDefaults = (seo, siteUrl, canonicalPath) => ({
    title: seo.title || DEFAULT_SEO.title,
    description: seo.description || DEFAULT_SEO.description,
    keywords: seo.keywords || "",
    ogTitle: seo.ogTitle || seo.title || DEFAULT_SEO.title,
    ogDescription: seo.ogDescription || seo.description || DEFAULT_SEO.description,
    ogImage: resolveMediaUrl(siteUrl, seo.ogImage),
    robotsIndex: seo.robotsIndex || "index",
    robotsFollow: seo.robotsFollow || "follow",
    canonicalUrl: `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`,
    structuredData: seo.structuredData || null,
});

const fromRecord = (record, fallbackTitle, fallbackDescription, extra = {}) => {
    if (!record) {
        return { title: fallbackTitle, description: fallbackDescription, ...extra };
    }

    return {
        title: record.meta_title || fallbackTitle,
        description: record.meta_description || fallbackDescription,
        keywords: record.meta_keywords,
        ogTitle: record.og_title,
        ogDescription: record.og_description,
        ogImage: record.og_image,
        robotsIndex: record.robots_index,
        robotsFollow: record.robots_follow,
        ...extra,
    };
};

const getFirst = async (Model) => Model.findOne({ order: [["id", "DESC"]] });

const STATIC_SEO = {
    "/blogs": { title: "Blogs | ASSIPL", description: "Insights and updates from ASSIPL on security systems, integration, and infrastructure." },
    "/products": { title: "Products | ASSIPL", description: "Explore ASSIPL's range of electronic security and safety products, from surveillance to fire detection." },
    "/career": { title: "Careers | ASSIPL", description: "Join the ASSIPL team. Open positions and application details will be listed here soon." },
    "/privacy-policy": { title: "Privacy Policy | ASSIPL", description: "Read the ASSIPL privacy policy to understand how we collect, use, and protect your information." },
    "/terms-and-conditions": { title: "Terms and Conditions | ASSIPL", description: "Read the terms and conditions governing the use of the ASSIPL website and services." },
};

const SINGLE_SERVICE_ROUTE_SLUGS = {
    "/strategic-planning-design": "strategic-planning-design",
    "/core-project-execution-sitc": "core-project-execution-sitc",
};

const organizationSchema = (siteUrl, contactPage) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Automation Systems and Solutions (India) Pvt. Ltd.",
    alternateName: "ASSIPL",
    url: siteUrl,
    logo: `${siteUrl}/favicon.webp`,
    ...(contactPage?.email ? { email: contactPage.email } : {}),
    ...(contactPage?.phoneno ? { telephone: contactPage.phoneno.split("/")[0].trim() } : {}),
    ...(contactPage?.address
        ? {
              address: {
                  "@type": "PostalAddress",
                  streetAddress: contactPage.address.replace(/\n+/g, ", "),
              },
          }
        : {}),
    sameAs: [contactPage?.linkedin_link].filter(Boolean),
});

const articleSchema = (siteUrl, blog, canonicalPath) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt || undefined,
    image: resolveMediaUrl(siteUrl, blog.hero_image || blog.featured_image) || undefined,
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    mainEntityOfPage: `${siteUrl}${canonicalPath}`,
    publisher: {
        "@type": "Organization",
        name: "ASSIPL",
        logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.webp` },
    },
});

const productSchema = (siteUrl, product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.excerpt || undefined,
    image: resolveMediaUrl(siteUrl, product.front_image || product.main_image) || undefined,
    brand: { "@type": "Brand", name: "ASSIPL" },
});

const resolveSeoForPath = async (pathname, siteUrl) => {
    const cleanPath = pathname.replace(/\/+$/, "") || "/";

    if (cleanPath.startsWith("/admin")) {
        return withDefaults({ title: "ASSIPL Admin", robotsIndex: "noindex", robotsFollow: "nofollow" }, siteUrl, cleanPath);
    }

    if (cleanPath === "/") {
        const [home, contactPage] = await Promise.all([getFirst(db.Home), getFirst(db.ContactPage)]);
        return withDefaults(
            fromRecord(home, "Automation Systems and Solutions | ASSIPL", DEFAULT_SEO.description, {
                structuredData: organizationSchema(siteUrl, contactPage),
            }),
            siteUrl,
            cleanPath
        );
    }

    if (cleanPath === "/about" || cleanPath === "/about-us") {
        const about = await getFirst(db.About);
        return withDefaults(
            fromRecord(
                about,
                "About Us | ASSIPL",
                "India's trusted security infrastructure partner, delivering integrated electronic security and safety solutions since 2009."
            ),
            siteUrl,
            cleanPath
        );
    }

    if (cleanPath === "/process") {
        const process = await getFirst(db.Process);
        return withDefaults(
            fromRecord(
                process,
                "Process | ASSIPL",
                "Our structured deployment process for enterprise security rollouts, from strategic blueprinting to handover."
            ),
            siteUrl,
            cleanPath
        );
    }

    if (cleanPath === "/contact" || cleanPath === "/contact-us") {
        const contactPage = await getFirst(db.ContactPage);
        const title = contactPage?.contact_title ? `${contactPage.contact_title} | ASSIPL` : "Contact | ASSIPL";
        const description =
            contactPage?.contact_description ||
            "Contact us for reliable security solutions, maintenance support, and assistance.";
        return withDefaults({ title, description }, siteUrl, cleanPath);
    }

    if (cleanPath === "/service" || cleanPath === "/services") {
        const servicesPage = await getFirst(db.ServicesPage);
        return withDefaults(
            fromRecord(
                servicesPage,
                "Services | ASSIPL",
                "End-to-end enterprise integration services from ASSIPL, from strategic planning to lifecycle maintenance."
            ),
            siteUrl,
            cleanPath
        );
    }

    if (cleanPath === "/csr") {
        const csr = await getFirst(db.Csr);
        return withDefaults(
            fromRecord(
                csr,
                "CSR | ASSIPL",
                "Corporate social responsibility initiatives by Automation Systems and Solutions (India) Pvt. Ltd."
            ),
            siteUrl,
            cleanPath
        );
    }

    if (STATIC_SEO[cleanPath]) {
        return withDefaults(STATIC_SEO[cleanPath], siteUrl, cleanPath);
    }

    const blogMatch = cleanPath.match(/^\/blogs\/([^/]+)$/);
    if (blogMatch) {
        const blog = await db.Blog.findOne({ where: { slug: blogMatch[1] } });
        return withDefaults(
            fromRecord(blog, blog?.title ? `${blog.title} | ASSIPL` : "Blog | ASSIPL", blog?.excerpt || DEFAULT_SEO.description, {
                structuredData: blog ? articleSchema(siteUrl, blog, cleanPath) : null,
            }),
            siteUrl,
            cleanPath
        );
    }

    const productMatch = cleanPath.match(/^\/products\/([^/]+)$/);
    if (productMatch) {
        const product = await db.Product.findOne({ where: { slug: productMatch[1] } });
        return withDefaults(
            fromRecord(
                product,
                product?.title ? `${product.title} | ASSIPL` : "Product | ASSIPL",
                product?.excerpt || DEFAULT_SEO.description,
                { structuredData: product ? productSchema(siteUrl, product) : null }
            ),
            siteUrl,
            cleanPath
        );
    }

    const serviceSlug =
        SINGLE_SERVICE_ROUTE_SLUGS[cleanPath] ||
        (cleanPath.match(/^\/services\/([^/]+)$/) || [])[1];

    if (serviceSlug) {
        const service = await db.SingleService.findOne({ where: { slug: serviceSlug } });
        return withDefaults(
            fromRecord(service, service?.title ? `${service.title} | ASSIPL` : "Service | ASSIPL", DEFAULT_SEO.description),
            siteUrl,
            cleanPath
        );
    }

    return withDefaults({}, siteUrl, cleanPath);
};

module.exports = { resolveSeoForPath };
