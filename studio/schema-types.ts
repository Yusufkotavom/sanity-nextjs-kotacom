// documents
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import product from "./schemas/documents/product";
import service from "./schemas/documents/service";
import project from "./schemas/documents/project";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";
import navigation from "./schemas/documents/navigation";
import settings from "./schemas/documents/settings";
import themeSettings from "./schemas/documents/theme-settings";
import seoSettings from "./schemas/documents/seo-settings";
import redirect from "./schemas/documents/redirect";
import reusableSection from "./schemas/documents/reusable-section";
import seoOpsSettings from "./schemas/documents/seo-ops-settings";
import aiWriterSettings from "./schemas/documents/ai-writer-settings";

// Schema UI shared objects
import blockContent from "./schemas/blocks/shared/block-content";
import link from "./schemas/blocks/shared/link";
import navigationLinkChild from "./schemas/blocks/shared/navigation-link-child";
import { colorVariant } from "./schemas/blocks/shared/color-variant";
import { buttonVariant } from "./schemas/blocks/shared/button-variant";
import { navigationIcon } from "./schemas/blocks/shared/navigation-icon";
import { uiIcon } from "./schemas/blocks/shared/ui-icon";
import sectionPadding from "./schemas/blocks/shared/section-padding";
// Schema UI objects
import hero1 from "./schemas/blocks/hero/hero-1";
import hero2 from "./schemas/blocks/hero/hero-2";
import sectionHeader from "./schemas/blocks/section-header";
import splitRow from "./schemas/blocks/split/split-row";
import splitContent from "./schemas/blocks/split/split-content";
import splitCardsList from "./schemas/blocks/split/split-cards-list";
import splitCard from "./schemas/blocks/split/split-card";
import splitImage from "./schemas/blocks/split/split-image";
import splitInfoList from "./schemas/blocks/split/split-info-list";
import splitInfo from "./schemas/blocks/split/split-info";
import gridCard from "./schemas/blocks/grid/grid-card";
import pricingCard from "./schemas/blocks/grid/pricing-card";
import gridPost from "./schemas/blocks/grid/grid-post";
import gridRow from "./schemas/blocks/grid/grid-row";
import carousel1 from "./schemas/blocks/carousel/carousel-1";
import carousel2 from "./schemas/blocks/carousel/carousel-2";
import timelineRow from "./schemas/blocks/timeline/timeline-row";
import timelinesOne from "./schemas/blocks/timeline/timelines-1";
import cta1 from "./schemas/blocks/cta/cta-1";
import whatsappCta from "./schemas/blocks/cta/whatsapp-cta";
import logoCloud1 from "./schemas/blocks/logo-cloud/logo-cloud-1";
import faqs from "./schemas/blocks/faqs";
import newsletter from "./schemas/blocks/forms/newsletter";
import allPosts from "./schemas/blocks/all-posts";
import legacyRichContent from "./schemas/blocks/legacy/legacy-rich-content";

export const schemaTypes = [
  // documents
  page,
  post,
  product,
  service,
  project,
  author,
  category,
  faq,
  testimonial,
  navigation,
  settings,
  themeSettings,
  seoSettings,
  seoOpsSettings,
  aiWriterSettings,
  redirect,
  reusableSection,
  // shared objects
  blockContent,
  link,
  navigationLinkChild,
  colorVariant,
  buttonVariant,
  navigationIcon,
  uiIcon as any,
  sectionPadding,
  // blocks
  hero1,
  hero2,
  sectionHeader,
  splitRow,
  splitContent,
  splitCardsList,
  splitCard,
  splitImage,
  splitInfoList,
  splitInfo,
  gridCard,
  pricingCard,
  gridPost,
  gridRow,
  carousel1,
  carousel2,
  timelineRow,
  timelinesOne,
  cta1,
  whatsappCta,
  logoCloud1,
  faqs,
  newsletter,
  allPosts,
  legacyRichContent,
];
