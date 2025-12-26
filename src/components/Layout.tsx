import { css, Style } from "hono/css";

interface SiteData {
  title: string;
  description: string;
  children?: any;
}

export const Layout = (props: SiteData) => (
  <html>
    <head>
      <title>{ props.title }</title>
      <meta name="description" content="${props.description}" />
      <Style>
        { css`
          html {
            font-family: Arial, Helvetica, sans-serif;
            background-color: hwb(150 40% 10%);
          }
          body {
            display: grid;
            place-content: center;
            font-size: 2rem;
          }
        `}
      </Style>
    </head>
    <body>{ props.children }</body>
  </html>
);
