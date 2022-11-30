import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";
import "../FeaturedInfo.css";

const FeaturedItem = (props) => {
  return (
    <div className="featuredItem">
      <span className="featuredTitle">{props.title}</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">{props.number}</span>
        <span className="featuredMoneyRate">
          {/* {props.isDowngrade ? ( -1.4 <ArrowDownward className="featuredIcon negative" /> ) : -1.4 <ArrowDownward className="featuredIcon negative" />} */}
          {/* {Math.floor(props.percentage)}{" "} */}
          {props.percentage}{" "}
          {props.isDowngrade ? (
            <ArrowDownwardIcon className="featuredIcon negative" />
          ) : (
            <ArrowUpwardIcon className="featuredIcon" />
          )}
        </span>
      </div>
      <span className="featuredSub">{props.text}</span>
    </div>
  );
};

export default FeaturedItem;
