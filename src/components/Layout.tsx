import classes from "./Layout.module.css";

import Title from "./title/Title";
import ListsSection from "./lists/ListsSection";
import TopButton from "./TopButton";

const Layout: React.FC<{}> = () => {
  return (
    <div className={classes.Layout}>
      <Title />
      <ListsSection />
      <TopButton />
    </div>
  );
};

export default Layout;
