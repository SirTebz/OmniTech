import type { Metadata } from 'next';
import { DemoNavbar } from '@/components/demo/aeroreserve/demo-navbar';
import { DemoFooter } from '@/components/demo/aeroreserve/demo-footer';

export const metadata: Metadata = {
  title: {
    template: '%s | AeroReserve Demo',
    default: 'AeroReserve Demo',
  },
  description: 'AeroReserve Aviation Platform interactive demo',
};

export default function AeroReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <DemoNavbar />
      <main className="flex-1">
        {children}
      </main>
      <DemoFooter />
    </div>
  );
}
