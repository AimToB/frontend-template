import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <Section>
      <Container>
        <h1 className="mb-4 text-4xl font-bold">{t("title")}</h1>
        <p className="mb-6 text-muted-foreground">{t("desc")}</p>
        <Link href="/blog/i18n-cms" locale="en">
          <Button>Sample Blog</Button>
        </Link>
      </Container>
    </Section>
  );
}
