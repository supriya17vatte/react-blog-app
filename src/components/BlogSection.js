import React, { useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const BlogSection = ({
  blogs,
  user,
  imgUrl,
  handleDelete,
}) => {
// console.log("user id in blog section :",user?.uid);
// console.log("userId  :",userId);

    const userId = user?.uid;
  return (
    <div>
      {blogs?.map((data) => {
        return (
          <div className="row pb-4" key={data?.id}>
            <div className="col-md-5">
              <div className="hover-blogs-img">
                <div className="blogs-img">
                  <img src={imgUrl} alt={data?.title} />
                  <div></div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="text-start">
                <h6 className="category catg-color">{data?.category}</h6>
                <span className="title py-2">{data?.title}</span>
                <span className="meta-info">
                  <p className="author">{data?.author}</p> -&nbsp;
                  {data?.timestamp && data?.timestamp?.toDate().toDateString()}
                </span>
              </div>
              <div className="short-description text-start">
                {excerpt(data?.description, 120)}
              </div>
              <Link to={`/detail/${data?.id}`}>
                <button className="btn btn-read">Read More</button>
              </Link>
            {user?.uid && data?.userId === userId &&(
                <div style={{ float: "right" }}>
                  <FontAwesome
                    name="trash"
                    style={{ margin: "15px", cursor: "pointer" }}
                    size="2x"
                    onClick={() => handleDelete(data?.id)}
                  />
                  <Link to={`/update/${data?.id}`}>
                    <FontAwesome
                      name="edit"
                      style={{ cursor: "pointer" }}
                      size="2x"
                    />
                  </Link>
                </div>
            )}
               
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogSection;
