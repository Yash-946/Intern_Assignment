import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";

function Post() {
  const token = getToken();
  if (token == null) {
    return (
      <div>
        <h1 className="text-center font-bold text-3xl mt-10 text-red-500 border-solid border-red-500 border-4	">
          Unauthorized user not allowed! Please Signup
        </h1>
      </div>
    );
  } 
  else {
    const [InputArray, setInputArray] = useState([]);
    useEffect(() => {
      fetch();
    }, []);

    async function fetch() {
      await axios
        .get(
          `https://todoback-jb7c.onrender.com/api/v2/getTasks/65c52bbc18895e3a34336f4d`
        )
        .then((response) => {
          setInputArray(response.data.list);
        });
    }

    function fetchMoreData() {
      setTimeout(() => {
        setInputArray((prevInputArray) => [
          ...prevInputArray,
          ...InputArray.slice(0, 9),
        ]);
      }, 1500);
    }

    return (
      <div className="bg-orange-200">
        <div className="text-4xl text-center p-2 text-red-700 font-bold	">
          Posts
        </div>
        <InfiniteScroll
          dataLength={InputArray.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4 className="text-center font-bold">Loading...</h4>}
        >
          {InputArray &&
            InputArray.map((item, index) => {
              return (
                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                  <Card title={item.title} body={item.body} />
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    );
  }
}

function getToken() {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  if (tokenData && new Date().getTime() < tokenData.expires) {
    return tokenData.value;
  } else {
    localStorage.removeItem("token");
    return null;
  }
}

export default Post;
