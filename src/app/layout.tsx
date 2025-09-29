import '@remoola/ui/src/styles.css';  
import './globals.css';

export const metadata = { title: `Remoola Admin`, description: `Admin CMS` };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
