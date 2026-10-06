export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", description: "What we build & solve" },
  { label: "Work", href: "/work", description: "Selected projects & case studies" },
  { label: "About", href: "/about", description: "Our philosophy & engineering approach" },
  { label: "Contact", href: "/contact", description: "Start a project with us" },
];
