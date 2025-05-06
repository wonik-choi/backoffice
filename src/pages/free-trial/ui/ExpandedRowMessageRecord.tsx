const EmptyMessageRecord = () => {
  return (
    <div className="text-center py-10 text-gray-500">
      <p>알림톡 내역이 없습니다.</p>
    </div>
  );
};

const ExpandedRowMessageRecord = () => {
  return (
    <section className="col-span-3 bg-white rounded-lg p-5 shadow-sm border border-gray-100">
      <EmptyMessageRecord />
    </section>
  );
};

export default ExpandedRowMessageRecord;
