import Comments from "@/components/Comments";
import Image from "@/components/Image";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import type { Authors, Blog } from "contentlayer/generated";
import TOCInline from "pliny/ui/TOCInline";
import { CoreContent } from "pliny/utils/contentlayer";
import { ReactNode } from "react";

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`;
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, toc } = content;
  const basePath = path.split("/")[0];

  return (
    <div className="grid grid-cols-5 grid-rows-1 gap-4">
      {/* Left section */}
      <div className="pt-80 max-xl:hidden">
        <div className="sticky top-14">
          <p className="pb-4 text-lg">Table of Contents</p>
          <TOCInline
            toc={toc}
            ulClassName="flex flex-col gap-1"
            liClassName="text-xs text-gray-500 hover:underline max-w-64"
          />
        </div>
      </div>

      {/* Main section */}
      <div className="col-span-5 xl:col-span-3">
        <article className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center flex flex-col gap-4">
              <PageTitle>{title}</PageTitle>
              <dl className="space-y-10">
                <div className="flex flex-row justify-center items-center gap-4">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                  {tags && (
                    <>
                      <dt className="sr-only">Tags</dt>
                      <dd className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </dd>
                    </>
                  )}
                </div>
              </dl>
              <dl className="flex flex-row items-center justify-center">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Github</dt>
                          <dd>
                            {author.github && (
                              <Link
                                href={author.github}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.github.replace("https://github.com/", "@")}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
            </div>
          </header>
          <div className="pb-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              {/* <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
              <Link href={discussUrl(path)} rel="nofollow">
                Discuss on Twitter
              </Link>
              {` • `}
              <Link href={editUrl(filePath)}>View on GitHub</Link>
            </div> */}
              {/* {siteMetadata.comments && (
              <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )} */}
            </div>
          </div>

          {/* Article navigation */}
          <footer>
            {(next || prev) && (
              <div className="grid grid-cols-2 grid-rows-1 gap-2 py-4 xl:py-8">
                {prev?.path && <ArticleNavLink href={`/${prev.path}`} title="Previous Article" subtitle={prev.title} />}
                {next?.path && <ArticleNavLink href={`/${next.path}`} title="Next Article" subtitle={next.title} />}
              </div>
            )}
            <div className="pt-4 xl:pt-8">
              <Link
                href={`/${basePath}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Back to the blog"
              >
                &larr; Back to the blog
              </Link>
            </div>
          </footer>
        </article>
      </div>

      {/* Right section */}
      <div className="col-start-5">{/* Advertise */}</div>

      <ScrollTopAndComment />
    </div>
  );
}

const ArticleNavLink = ({ href, title, subtitle }: { href: string; title: string; subtitle: string }) => {
  return (
    <Link
      href={href}
      className="group rounded-md border-solid border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 border-[1px] p-2"
    >
      <h2 className="text-xs uppercase tracking-wide text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
        {title}
      </h2>
      <p className="text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400">{subtitle}</p>
    </Link>
  );
};
