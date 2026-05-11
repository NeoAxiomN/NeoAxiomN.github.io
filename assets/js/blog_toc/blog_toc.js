// Build a compact post TOC from rendered H2/H3 headings when the layout enables it.
let initBlogToc = () => {
  const article = document.querySelector('article.page[data-blog-toc-eligible="true"]');
  if (!article) {
    return;
  }

  const toc = article.querySelector("[data-blog-toc]");
  const list = article.querySelector("[data-blog-toc-list]");
  const content = article.querySelector(".page__content");
  if (!toc || !list || !content) {
    return;
  }

  const headings = Array.from(content.querySelectorAll("h2, h3")).filter((heading) => {
    return heading.textContent.trim().length > 0;
  });
  if (!headings.length) {
    return;
  }

  const usedIds = new Set(
    Array.from(document.querySelectorAll("[id]"))
      .map((node) => node.id)
      .filter((id) => id)
  );

  let slugifyHeading = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  let ensureHeadingId = (heading) => {
    if (heading.id) {
      return heading.id;
    }

    let baseId = slugifyHeading(heading.textContent) || "section";
    let candidateId = baseId;
    let suffix = 2;

    while (usedIds.has(candidateId)) {
      candidateId = `${baseId}-${suffix}`;
      suffix += 1;
    }

    heading.id = candidateId;
    usedIds.add(candidateId);
    return candidateId;
  };

  let currentH2Item = null;

  headings.forEach((heading) => {
    const headingId = ensureHeadingId(heading);
    const item = document.createElement("li");
    const link = document.createElement("a");

    link.href = `#${headingId}`;
    link.textContent = heading.textContent.trim();
    item.appendChild(link);

    if (heading.tagName === "H2") {
      list.appendChild(item);
      currentH2Item = item;
      return;
    }

    if (!currentH2Item) {
      list.appendChild(item);
      return;
    }

    let sublist = currentH2Item.querySelector("ul");
    if (!sublist) {
      sublist = document.createElement("ul");
      currentH2Item.appendChild(sublist);
    }
    sublist.appendChild(item);
  });

  article.classList.add("page--has-blog-toc");
  toc.hidden = false;
};

export { initBlogToc };
