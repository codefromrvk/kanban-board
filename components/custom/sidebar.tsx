import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAccountBalanceWallet, MdContacts } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link href="/">
            <Button className="w-full justify-start">
              <BiSolidDashboard size={20} className="mr-6" />
              Home
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
