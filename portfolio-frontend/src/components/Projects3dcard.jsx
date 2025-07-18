import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Link } from "react-router-dom";
import { SiGithub } from "react-icons/si";

export function ProjectThreeDCard({
  title,
  description,
  cardImage,
  livelink,
  githublink,
}) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-left"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={cardImage}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as={Link}
            to={livelink}
            target="__blank"
            className="px-4 py-2 rounded-xl text-base font-normal dark:text-white"
          >
            Try Live →
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            to={githublink}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-base font-bold"
          >
            <SiGithub className="inline-block mr-2" />
            Link
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
