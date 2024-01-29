import { useLocation } from "react-router-dom";
import LotsListComponent from "../components/dashboard/LotsListComponent";
import DashboardLayout from "../layouts/DashboardLayout";
import AddLotComponent from "../components/dashboard/AddLotComponent";
import LotDetailComponent from "../components/dashboard/LotDetailComponent";

const DashboardPage = () => {
  const location = useLocation();
  let current = "";
  const routeComponents = {
    lot: LotsListComponent,
    "add-lot": AddLotComponent,
    lotId: LotDetailComponent,
  };
  if (location.pathname === "/") {
    current = "lot";
  } else if (location.pathname.startsWith("/lot/")) {
    current = "lotId";
  } else {
    current = location.pathname.split("/")[1];
  }

  //   creating component
  const CurrentComponent = routeComponents[current];

  return (
    <>
      <DashboardLayout>
        <CurrentComponent />
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
