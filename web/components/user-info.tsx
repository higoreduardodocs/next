import { ExtendedUser } from "@/next-auth";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">2FA</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100">
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
