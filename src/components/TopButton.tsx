import SquareButton from "./UI/SquareButton";

const TopButton: React.FC = () => {
  return <SquareButton text="&#8593;" onClick={() => {window.scrollTo(0, 0)}} />
}

export default TopButton;