import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

// Change entry since default entry changed directory
const withNextIntl = createNextIntlPlugin("./packages/i18n/src/request.ts");
export default withNextIntl(nextConfig);
