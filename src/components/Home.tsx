import { Layout } from "@/components/Layout";

interface SiteData {
  title: string;
  description: string;
  children?: any;
}

export const Home = (props: { siteData: SiteData; name: string }) => (
  <Layout { ...props.siteData }>
    <h1>
      Hello
      { " " }
      { props.name }
    </h1>
    <div>
      <a href="/reference"> See API Reference </a>
    </div>
  </Layout>
);
