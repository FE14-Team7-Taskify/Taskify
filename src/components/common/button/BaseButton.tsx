import { BaseButtonProps } from './type';

const BaseButton = ({ children, onClick, ...props }: BaseButtonProps) => {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default BaseButton;
