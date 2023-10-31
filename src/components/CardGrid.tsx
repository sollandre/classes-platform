import React, { Component } from "react";

type CardGridProps = {
  data: JSX.Element[] | JSX.Element | undefined;
  fallback?: JSX.Element;
  className?: string;
}

export function CardGrid({
  data,
  fallback = <></>,
  className
}: CardGridProps) {

  const hasData = data ? Array.isArray(data) ? data.length > 0 : true : false

  return (
    <>
      {hasData ? (
        <div className={"grid lg:grid-cols-3 2xl:grid-cols-4  gap-6 mt-6"+className}>{data}</div>
      ) : (
        fallback
      )}
    </>
  );
}
