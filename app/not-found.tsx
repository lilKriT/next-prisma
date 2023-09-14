import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="h-full flex justify-center items-center">
      <div>
        <h1 className="text-4xl">Not Found.</h1>
        <div className="flex justify-center mt-8">
          <Link href="/" className="btn btn--primary">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
