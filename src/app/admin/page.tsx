import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/admin-auth";

import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }

  return <AdminDashboard username={user} />;
}
