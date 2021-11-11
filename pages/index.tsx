import A from "@components/A";
import Layout from "@components/Layout"

export default function Page(): React.ReactElement {
    return (
        <Layout.Root navGroup="home" pageTitle="80x86">
            <Layout.Content>
                <p>
                    This is the 80x86 website;
                    A website for all things x86 related.
                </p>
                <p>
                    This website is designed to be a digital reference version of the x86 architecture family.
                    This includes everything from the venerable <A href="/architecture/8086">8086</A> to the Intel Core and AMD Ryzen families of today.
                </p>
            </Layout.Content>
        </Layout.Root>
    );
}
