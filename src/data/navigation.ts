export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", description: "Background, capabilities & problem-solving approach" },
  { label: "Services", href: "/services", description: "Software development, IT support, apps & analytics" },
  { label: "Projects", href: "/work", description: "Interactive demos & engineering portfolio" },
  { label: "Process", href: "/process", description: "How we discover, build, deliver & support" },
  { label: "Contact", href: "/contact", description: "Start a project or request technical support" },
];
