import classes from "./Layout.module.css";

import Title from "./title/Title";
import ListsSection from "./lists/ListsSection";
import LoadingSection from "./loadingSection/LoadingSection";

const Layout: React.FC<{}> = () => {
  return (
    <div className={classes.Layout}>
      <Title />
      <ListsSection />
      <LoadingSection />
    </div>
  );
};

export default Layout;
