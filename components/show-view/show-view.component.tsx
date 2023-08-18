import { FC, ReactNode } from 'react';

interface IShowViewProps {
  children: ReactNode;
  when: boolean;
}

const ShowView: FC<IShowViewProps> = ({ children, when }) => {
  return !when ? null : <>{children}</>;
};

export default ShowView;
