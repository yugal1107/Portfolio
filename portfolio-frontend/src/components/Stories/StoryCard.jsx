import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";

export default function StoryCard({
  title,
  date,
  image,
  status,
  id,
  location,
}) {
  return (
    <a href={`/story/${id}`}>
      <Card isPressable className="py-3 px-1 bg-slate-900 m-5">
        <CardHeader className="pb-2 pt-2 px-4 flex-col items-start gap-1">
          <p className="text-tiny uppercase font-light">{status}</p>
          <h4 className="font-bold text-2xl">{title}</h4>
          <small className="text-default-500">{location}</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={image}
            height={250}
            width={270}
          />
        </CardBody>
      </Card>
    </a>
  );
}
