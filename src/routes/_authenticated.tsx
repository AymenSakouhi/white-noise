import { queryOpts } from "@/lib/reactQuery";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";


export const Route = createFileRoute("/_authenticated")({
    component: LayoutComponent,
    beforeLoad: async ({ context, location }) => {
        const user = await context.queryClient.fetchQuery(
            queryOpts.userData(),
        );

        if (user == null) {
            throw redirect({ to: "/login", search: { redirect: location.href } });
        }
    },
});

function LayoutComponent() {

    return (
        <Outlet />
    );
}
