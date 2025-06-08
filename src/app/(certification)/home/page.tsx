import Home from '@/views/home/ui/Home';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <section className="flex justify-center items-center h-screen w-full">
      <iframe
        src="https://dev.an2.api.slc.susimdal.com/back-office/grafana/d-solo/aeo42id1snytce/30130850-b080-59f7-8b1e-b1ea5e9facdd?orgId=1&from=1746597769412&to=1749189769412&panelId=2"
        width="100%"
        height="100%"
      ></iframe>
    </section>
  );
};

export default Page;
