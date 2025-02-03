import type { MDXComponents } from "mdx/types";
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm";
import TOCInline from "pliny/ui/TOCInline";
import Image from "./Image";
import CustomLink from "./Link";
import TableWrapper from "./TableWrapper";
import Pre from "./mdx/Pre";

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
};
