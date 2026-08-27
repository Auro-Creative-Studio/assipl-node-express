const express = require("express");
const db = require("../models");

const router = express.Router();

const STATIC_ROUTES = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/process", priority: "0.6", changefreq: "monthly" },
    { path: "/service", priority: "0.8", changefreq: "monthly" },
    { path: "/products", priority: "0.8", changefreq: "weekly" },
    { path: "/blogs", priority: "0.7", changefreq: "weekly" },
    { path: "/csr", priority: "0.5", changefreq: "monthly" },
    { path: "/contact", priority: "0.6", changefreq: "yearly" },
    { path: "/career", priority: "0.4", changefreq: "monthly" },
    { path: "/privacy-policy", priority: "0.2", changefreq: "yearly" },
    { path: "/terms-and-conditions", priority: "0.2", changefreq: "yearly" },
];

const escapeXml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

router.get("/sitemap.xml", async (req, res) => {
    try {
        const siteUrl = (process.env.SITE_URL || `${req.protocol}://${req.get("host")}`).replace(/\/$/, "");

        const [blogs, products, services] = await Promise.all([
            db.Blog.findAll({ where: { published: true }, attributes: ["slug", "updated_at"] }),
            db.Product.findAll({ where: { published: true }, attributes: ["slug", "updated_at"] }),
            db.SingleService.findAll({ attributes: ["slug", "updated_at"] }),
        ]);

        const urls = [
            ...STATIC_ROUTES.map((route) => ({
                loc: `${siteUrl}${route.path}`,
                priority: route.priority,
                changefreq: route.changefreq,
            })),
            ...blogs.map((blog) => ({
                loc: `${siteUrl}/blogs/${blog.slug}`,
                lastmod: blog.updated_at,
                priority: "0.6",
                changefreq: "monthly",
            })),
            ...products.map((product) => ({
                loc: `${siteUrl}/products/${product.slug}`,
                lastmod: product.updated_at,
                priority: "0.7",
                changefreq: "monthly",
            })),
            ...services.map((service) => ({
                loc: `${siteUrl}/services/${service.slug}`,
                lastmod: service.updated_at,
                priority: "0.6",
                changefreq: "monthly",
            })),
        ];

        const body = urls
            .map((url) => {
                const lastmodTag = url.lastmod
                    ? `<lastmod>${new Date(url.lastmod).toISOString().slice(0, 10)}</lastmod>`
                    : "";
                return `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n    ${lastmodTag}\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`;
            })
            .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

        res.set("Content-Type", "application/xml");
        res.send(xml);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
