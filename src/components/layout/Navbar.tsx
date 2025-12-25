import Container from "@/components/common/Container";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { Link } from "@i18n/navigation";

export default function Navbar() {
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
          <div className="justify-self-end">
            <LanguageSwitcher />
          </div>
        </nav>
      </Container>
    </header>
  );
}
