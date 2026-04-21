import { type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "../../lib/utils";

interface MarkdownBodyProps {
  source: string;
  className?: string;
  onWikiLink?: (slug: string) => void;
}

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-_/]*$/i;

function isLikelyWikiSlug(href: string): boolean {
  if (!href) return false;
  if (/^https?:/i.test(href)) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("mailto:")) return false;
  const cleaned = href.replace(/^\.\//, "").replace(/\.md$/i, "");
  return SLUG_PATTERN.test(cleaned);
}

export function MarkdownBody({ source, className, onWikiLink }: MarkdownBodyProps): ReactNode {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none text-sm leading-relaxed text-foreground",
        "[&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mt-4 [&_h1]:mb-2",
        "[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2",
        "[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-muted-foreground [&_h3]:mt-3 [&_h3]:mb-1",
        "[&_p]:my-2 [&_p]:text-sm",
        "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:my-0.5",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono",
        "[&_pre]:my-3 [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:text-xs [&_pre>code]:bg-transparent [&_pre>code]:p-0",
        "[&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs",
        "[&_th]:border [&_th]:border-border [&_th]:bg-muted/40 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left",
        "[&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1",
        "[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
        "[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          a: ({ href, children, ...rest }) => {
            const target = href ?? "";
            if (onWikiLink && isLikelyWikiSlug(target)) {
              const slug = target.replace(/^\.\//, "").replace(/\.md$/i, "");
              return (
                <a
                  href={`#${slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onWikiLink(slug);
                  }}
                  {...rest}
                >
                  {children}
                </a>
              );
            }
            return (
              <a href={target} target="_blank" rel="noreferrer noopener" {...rest}>
                {children}
              </a>
            );
          }
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
