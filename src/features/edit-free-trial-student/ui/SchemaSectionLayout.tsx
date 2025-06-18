export const SchemaSectionLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="flex flex-col gap-[1.6rem] w-full mb-[2rem]">
      <h3 className="font-bold text-[2rem] text-susimdal-text-basic">{title}</h3>
      <div className="grid gap-[1.6rem] py-[1.6rem] px-[1.6rem] w-full">{children}</div>
    </section>
  );
};
