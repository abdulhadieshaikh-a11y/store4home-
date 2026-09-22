import AdminShell from '@/components/admin/AdminShell';

export const metadata = { title: 'Admin — store4home' };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
