import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { useNavigate } from "react-router-dom";

export function ThreeDCard({ id, title, date, image, status, location }) {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/story/${id}`)}
      className="cursor-pointer relative group perspective-1000"
    >
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {location}
          </CardItem>
          <CardItem
            translateZ="100"
            rotateX={5}
            rotateZ={-5}
            className="w-full mt-4"
          >
            <img
              // onClick={handleClick}
              src={`${image}`}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
