import { useEffect, useMemo, useState } from "react";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import Charts from "../components/charts/Charts";
import { useDispatch, useSelector } from "react-redux";

export const DashboardImpl = () => {
  const [userStats, setUserStats] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const dispatch = useDispatch();
//   const inventoryCount = useSelector((state) => state.product.count);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

//   useEffect(() => {
//     const getCountInventoryData = async () => {
//       await countProduct(dispatch);
//     };

//     getCountInventoryData();
//   }, []);

  useEffect(() => {
    let data = [
      { name: MONTHS[0], User: 15, Admin: 12 },
      { name: MONTHS[1], User: 20, Admin: 25 },
      { name: MONTHS[2], User: 65, Admin: 78 },
      { name: MONTHS[3], User: 45, Admin: 30 },
      { name: MONTHS[4], User: 100, Admin: 80 },
      { name: MONTHS[5], User: 74, Admin: 90 },
    ];
    setUserStats(data);

    let featureData = [
      {
        index: 1,
        title: "No of Users",
        number: 5,
        // percentage: -1.4,
        isDowngrade: false,
        text: "Compared to last month",
      },
      {
        index: 2,
        title: "New Events Items",
        number: 15,
        // percentage: +1.4,
        isDowngrade: true,
        text: "Compared to last month",
      },
      {
        index: 3,
        title: "No of Admin Users",
        number: 8,
        // percentage: -1.4,
        isDowngrade: false,
        text: "Compared to last month",
      },
    ];
    setFeaturedData(featureData);
  }, []);

  return (
    <div>
      <FeaturedInfo data={featuredData} />
      <Charts
        data={userStats}
        title="Users Analytics"
        grid
        dataKey1="User"
        dataKey2="Admin"
      />
    </div>
  );
};
