const EmptyCounselingRecord = () => {
  return (
    <div className="text-center py-[4rem] text-gray-500">
      <p>상담 기록이 없습니다.</p>
    </div>
  );
};

// TODO: 만약 dto 내 포함이 아니라 요청이라면, 해당 부분에 대해 suspense 적용 예정
// dto 내 포함이라면 props 처리
const ExpandedRowCounselingRecord = () => {
  return (
    <section className="col-span-3 bg-white rounded-lg p-[2rem] shadow-sm border border-gray-100">
      <EmptyCounselingRecord />
    </section>
  );
};

export default ExpandedRowCounselingRecord;
