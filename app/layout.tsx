import "./globals.css";

export const metadata = {
  title: "Unbirthday Tea Party",
  description: "Story-mode RSVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <div className="shell">{children}</div>
      </body>
    </html>
  );
}
