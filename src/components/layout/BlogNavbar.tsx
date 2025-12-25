import Container from "@/components/common/Container";
import { Link } from "@i18n";

type BlogNavbarProps = {
  languageSwitcher: React.ReactNode;
};

export default function BlogNavbar({ languageSwitcher }: BlogNavbarProps) {
  return (
    <header className="border-b">
      <Container>
        <nav className="h-16 grid grid-cols-3 items-center text-sm text-muted-foreground">
          <div className="justify-self-start">
            <span className="text-lg font-semibold">Brand</span>
          </div>
          <div className="justify-self-center flex items-center gap-6">
            <Link href="/abt">About</Link>
            <Link href="#">Contact</Link>
          </div>
          <div className="justify-self-end">{languageSwitcher}</div>
        </nav>
      </Container>
    </header>
  );
}
