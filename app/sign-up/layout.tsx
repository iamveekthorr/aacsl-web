import { ToastProvider } from '../toast.provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider>
        <main>{children}</main>
      </ToastProvider>
    </>
  );
}
