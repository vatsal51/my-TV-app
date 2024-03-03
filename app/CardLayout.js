import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { img_300, unavailable, loading } from "../app/config";
import Link from "next/link";

const CardLayout = ({ state, href, type }) => {
  return (
    <>
      {state.map((Val) => {
        const {
          name,
          title,
          poster_path,
          first_air_date,
          release_date,
          media_type,
          vote_average,
          id,
        } = Val;
        const cardType = type ? type : media_type;
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            key={Val.id}
            className="col-md-3 col-sm-4 py-3 justify-content-center g-4"
          >
            <Link
              href={href ? `${href}?type=${cardType}&id=${Val.id}` : ""}
              as={href ? `${href}?type=${cardType}&id=${Val.id}` : ""}
              key={id}
              className="col-md-3 col-sm-4 py-3"
            >
              <div id="card">
                <div className="card bg-dark">
                  <Image
                    priority={false}
                    src={
                      poster_path ? `${img_300}/${poster_path}` : unavailable
                    }
                    placeholder="blur"
                    blurDataURL={loading}
                    width={500}
                    height={500}
                    className="card-img-top pt-3 pb-0 px-3"
                    alt={`Poster for ${title || name}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center fs-5">
                      {title || name} / {parseFloat(vote_average).toFixed(1)}{" "}
                      <i className="bi bi-star-fill"></i>
                    </h5>
                    <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                      <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                      <div>{first_air_date || release_date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </>
  );
};

export default CardLayout;
