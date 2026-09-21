"use client";

import * as React from "react";
import { marked } from "marked";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Configure marked options
  const htmlContent = React.useMemo(() => {
    if (!content) return "";

    const renderer = new marked.Renderer();

    // Custom heading renderer to add id for anchors and Table of Contents
    renderer.heading = function ({ tokens, depth }) {
      const text = tokens.map((t) => ("text" in t ? t.text : "")).join("");
      const id = text
        .toLowerCase()
        .replace(/[*_`~[\]]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      const classes =
        depth === 2
          ? "text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-10 mb-4 pt-4 border-t border-border/40 scroll-mt-24 flex items-center group"
          : depth === 3
          ? "text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-8 mb-3 scroll-mt-24 flex items-center group"
          : "text-lg font-semibold text-foreground mt-6 mb-2";

      const parsedHeading = this.parser.parseInline(tokens);

      return `<h${depth} id="${id}" class="${classes}">
        <span>${parsedHeading}</span>
        <a href="#${id}" class="ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm font-normal">#</a>
      </h${depth}>`;
    };

    // Custom link renderer with security attributes
    renderer.link = function ({ href, title, tokens }) {
      const parsedText = this.parser.parseInline(tokens);
      const isExternal = href?.startsWith("http");
      const attrs = isExternal
        ? 'target="_blank" rel="noopener noreferrer"'
        : "";
      return `<a href="${href}" ${attrs} ${
        title ? `title="${title}"` : ""
      } class="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary font-medium transition-colors">${parsedText}</a>`;
    };

    // Custom blockquote renderer
    renderer.blockquote = function ({ tokens }) {
      return `<blockquote class="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 rounded-none text-muted-foreground italic">
        ${this.parser.parse(tokens)}
      </blockquote>`;
    };

    // Custom code block renderer
    renderer.code = function ({ text, lang }) {
      return `<div class="relative group my-6 overflow-hidden rounded-none border border-border/60 bg-muted/40 dark:bg-[#0d1117] shadow-lg">
        <div class="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/70 dark:bg-[#161b22] text-xs font-mono text-muted-foreground">
          <span>${lang || "text"}</span>
        </div>
        <pre class="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-foreground leading-relaxed"><code>${text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>
      </div>`;
    };

    // Custom inline code
    renderer.codespan = function ({ text }) {
      return `<code class="px-1.5 py-0.5 rounded-sm bg-muted font-mono text-xs sm:text-sm text-primary font-medium border border-border/50">${text}</code>`;
    };

    // Custom strong (bold text: **bold**)
    renderer.strong = function ({ tokens }) {
      return `<strong class="font-bold text-foreground">${this.parser.parseInline(tokens)}</strong>`;
    };

    // Custom em (italic text: *italic*)
    renderer.em = function ({ tokens }) {
      return `<em class="italic text-foreground/95">${this.parser.parseInline(tokens)}</em>`;
    };

    // Custom listitem
    renderer.listitem = function (item) {
      return `<li class="leading-relaxed pl-1">${this.parser.parse(item.tokens)}</li>`;
    };

    // Custom list styling
    renderer.list = function ({ items, ordered, start }) {
      const tag = ordered ? "ol" : "ul";
      const listClass = ordered
        ? "list-decimal list-outside pl-6 my-4 space-y-2 text-foreground/90 text-base"
        : "list-disc list-outside pl-6 my-4 space-y-2 text-foreground/90 text-base";
      let inner = "";
      for (let i = 0; i < items.length; i++) {
        inner += this.listitem(items[i]);
      }
      const startAttr = ordered && start && start !== 1 ? ` start="${start}"` : "";
      return `<${tag}${startAttr} class="${listClass}">${inner}</${tag}>`;
    };

    // Custom paragraph
    renderer.paragraph = function ({ tokens }) {
      return `<p class="text-base sm:text-lg text-foreground/90 leading-relaxed my-4">${this.parser.parseInline(tokens)}</p>`;
    };

    // Custom horizontal rule
    renderer.hr = function () {
      return `<hr class="my-8 border-border/40" />`;
    };

    // Custom table
    renderer.table = function ({ header, rows }) {
      const headerHtml = header
        .map(
          (cell) =>
            `<th class="px-4 py-2 border-b border-border/60 font-semibold text-left text-sm text-foreground bg-muted/50">${this.parser.parseInline(cell.tokens)}</th>`
        )
        .join("");
      const rowsHtml = rows
        .map(
          (row) =>
            `<tr class="border-b border-border/30 hover:bg-muted/20 transition-colors">${row
              .map(
                (cell) =>
                  `<td class="px-4 py-2.5 text-sm text-foreground/90">${this.parser.parseInline(cell.tokens)}</td>`
              )
              .join("")}</tr>`
        )
        .join("");

      return `<div class="overflow-x-auto my-6 rounded-none border border-border/50">
        <table class="w-full border-collapse">${headerHtml ? `<thead><tr>${headerHtml}</tr></thead>` : ""}<tbody>${rowsHtml}</tbody></table>
      </div>`;
    };

    return marked.parse(content, { renderer }) as string;
  }, [content]);

  // Handle copy buttons for code blocks
  React.useEffect(() => {
    if (!containerRef.current) return;
    const preBlocks = containerRef.current.querySelectorAll("pre");

    preBlocks.forEach((pre) => {
      const parent = pre.parentElement;
      if (!parent || parent.querySelector(".copy-btn")) return;

      const headerBar = parent.querySelector("div");
      if (!headerBar) return;

      const btn = document.createElement("button");
      btn.className =
        "copy-btn inline-flex items-center gap-1.5 px-2 py-1 text-xs font-sans font-medium rounded-none text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer";
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Salin`;

      btn.addEventListener("click", () => {
        const codeText = pre.querySelector("code")?.innerText || pre.innerText;
        navigator.clipboard.writeText(codeText);
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span class="text-emerald-500">Tersalin!</span>`;
        setTimeout(() => {
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Salin`;
        }, 2000);
      });

      headerBar.appendChild(btn);
    });
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className={`prose dark:prose-invert max-w-none text-foreground ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
