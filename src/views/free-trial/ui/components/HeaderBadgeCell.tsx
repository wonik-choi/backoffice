import { Badge } from '@/shared/components/atomics/badge';

const HeaderNameCell = ({ getValue }: { getValue: () => any }) => {
  const value = getValue();

  return <Badge variant="outline">{String(value)}</Badge>;
};

export default HeaderNameCell;
