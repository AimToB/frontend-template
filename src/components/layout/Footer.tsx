import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="border-t py-8 text-sm text-muted-foreground">
      <Container>
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} Brand</span>
          <span>All rights reserved</span>
        </div>
      </Container>
    </footer>
  );
}
