import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`rounded-lg px-4 py-2 font-medium transition-colors ${
        pathname === href
          ? 'bg-blue-700 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  );
}
