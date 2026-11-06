import { MDXRemote } from "next-mdx-remote/rsc";

export function ArticleBody({ source }: { source: string }) {
  return (
    <div className="article max-w-3xl text-base leading-relaxed">
      <MDXRemote source={source} />
    </div>
  );
}
