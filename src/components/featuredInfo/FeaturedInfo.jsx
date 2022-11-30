import "./FeaturedInfo.css";
import { useEffect, useState } from "react";
import FeaturedItem from "./featuredItem/FeaturedItem";
// import { userRequest } from "../../requestMethods";

export default function FeaturedInfo(props) {
  const { data } = props;
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [countCategory, setCountCategory] = useState();
  const [countUsers, setCountUsers] = useState();
  const [countPosts, setCountPosts] = useState();

  //   useEffect(() => {
  //     const getIncome = async () => {
  //       try {
  //         const res = await userRequest.get("orders/income");
  //         setIncome(res.data);
  //         setPerc((res.data[1].total * 100) / res.data[0].total - 100);
  //       } catch {}
  //     };
  //     getIncome();
  //   }, []);

  //   useEffect(() => {
  //     const getCountUsers = async () => {
  //       try {
  //         const res = await userRequest.get("http://localhost:5000/api/v1/user");
  //         setCountUsers(res.data.length);
  //         console.log(countUsers);
  //       } catch {}
  //     };
  //     getCountUsers();
  //   }, []);
  //   useEffect(() => {
  //     const getCountCategory = async () => {
  //       try {
  //         const res = await userRequest.get(
  //           "http://localhost:5000/api/v1/orders"
  //         );
  //         setCountCategory(res.data.length);
  //         console.log(countCategory);
  //       } catch {}
  //     };
  //     getCountCategory();
  //   }, []);
  //   useEffect(() => {
  //     const getCountPosts = async () => {
  //       try {
  //         const res = await userRequest.get(
  //           "http://localhost:5000/api/v1/products"
  //         );
  //         setCountPosts(res.data.length);
  //         console.log(countPosts);
  //       } catch {}
  //     };
  //     getCountPosts();
  //   }, []);

  return (
    <div className="featured">
      {/* <div className="featuredItem">
        <span className="featuredTitle">No of Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoney">15</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
      {/* {data.map((item) => {
        <FeaturedItem
          key={item.index}
          title={item.title}
          number={item.number}
          percentage={item.percentage}
          isDowngrade={item.isDowngrade}
          text={item.text}
        />;
        console.log(item);
      })} */}
      <FeaturedItem title={data[0]?.title} number={data[0]?.number} percentage={data[0]?.percentage} isDowngrade={data[0]?.isDowngrade} text={data[0]?.text} />
      <FeaturedItem title={data[1]?.title} number={data[1]?.number} percentage={data[1]?.percentage} isDowngrade={data[1]?.isDowngrade} text={data[1]?.text} />
      <FeaturedItem title={data[2]?.title} number={data[2]?.number} percentage={data[2]?.percentage} isDowngrade={data[2]?.isDowngrade} text={data[2]?.text} />
    </div>
  );
}
