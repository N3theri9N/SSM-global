import classes from "./Layout.module.css";

import Title from "./title/Title";
import ListsSection from "./lists/ListsSection";
import TopButton from "./TopButton";

const Layout: React.FC<{}> = () => {
  return (
    <div className={classes.Layout}>
      <Title />
      <ListsSection />
      <div className={classes.BottomBtn}>
        <TopButton />
      </div>
    </div>
  );
};

export default Layout;
