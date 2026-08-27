const fs = require("fs");
const { resolveSeoForPath } = require("./seoResolver");

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const safeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

const buildHeadTags = (seo) => {
    const tags = [
        `<meta name="description" content="${escapeHtml(seo.description)}">`,
        seo.keywords ? `<meta name="keywords" content="${escapeHtml(seo.keywords)}">` : "",
        `<meta name="robots" content="${seo.robotsIndex}, ${seo.robotsFollow}">`,
        `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}">`,
        `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}">`,
        `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}">`,
        seo.ogImage ? `<meta property="og:image" content="${escapeHtml(seo.ogImage)}">` : "",
        `<meta name="twitter:card" content="summary_large_image">`,
        seo.structuredData
            ? `<script type="application/ld+json">${safeJsonLd(seo.structuredData)}</script>`
            : "",
    ];

    return tags.filter(Boolean).join("\n    ");
};

const renderIndexHtml = async (indexHtmlPath, requestPath, siteUrl) => {
    const seo = await resolveSeoForPath(requestPath, siteUrl);
    const template = fs.readFileSync(indexHtmlPath, "utf-8");

    return template
        .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`)
        .replace("</head>", `    ${buildHeadTags(seo)}\n  </head>`);
};

module.exports = { renderIndexHtml };
