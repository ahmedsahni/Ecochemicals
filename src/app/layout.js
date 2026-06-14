import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Cleanex Pad Cleaner | ECO Chemicals",
  description: "Next-Generation Cellulose Cooling Pad Cleaner for Poultry Farms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F1F5F9] transition-colors duration-300" suppressHydrationWarning>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
