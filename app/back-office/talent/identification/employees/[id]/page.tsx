import React from "react";

interface propsType {
  params: Promise<{ id: number }>;
}
const Page = async (props : propsType) => {

	const params = await props.params; 
  return <div>Ceci est la page d&apos; {params.id}</div>;
};

export default Page;
