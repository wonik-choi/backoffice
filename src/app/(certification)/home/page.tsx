import Home from '@/views/home/ui/Home';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <section className="flex justify-center items-center h-screen w-full">
      <iframe src="http://dev.an2.api.slc.susimdal.com/back-office/grafana" width="100%" height="100%"></iframe>
    </section>
  );
};

export default Page;
