import Head from "next/head";
import Header from '@components/Header'
import Footer from '@components/Footer'


const Layout = ({ title, children }) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss/dist/tailwind.min.css"
        />
      </Head>
      <main className="container mx-auto  pt-8 min-h-screen">
        <Header/>
        {children}
        <Footer/>
      </main>
    </div>
  );
};

export default Layout;