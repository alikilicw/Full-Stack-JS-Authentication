interface Button1Props {
  isVisible?: boolean;
  onClick?: () => void;
  type?: string;
  placeHolder?: string;
  value?: string;
}

const Button1: React.FC<Button1Props> = ({
  isVisible = true,
  onClick,
  type = "submit",
  placeHolder,
  value = "Submit",
}) => {
  if (!isVisible) return null;

  return (
    <input
      type={type}
      className="p-2 hover:bg-slate-600 transition-all duration-500 font-semibold bg-slate-500 text-white rounded-md cursor-pointer w-40"
      placeholder={placeHolder}
      value={value}
      onClick={onClick}
    />
  );
};

export default Button1;
