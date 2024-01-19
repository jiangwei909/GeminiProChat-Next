import Script from 'next/script'

function About() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){
                  dataLayer.push(arguments);
                }
                gtag('js', new Date());
    
                gtag('config', '${process.env.GTAG_ID}');
              `,
        }}
      />
    </>
  );
}

export default About;
