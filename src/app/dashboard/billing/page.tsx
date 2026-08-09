import { getSession } from "@/lib/getSession";
import BillingClient from "@/components/BillingClient";

export default async function Page() {

    const session = await getSession();

    return (
        <BillingClient
            ownerId={session?.user?.id || ""}
        />
    );
}