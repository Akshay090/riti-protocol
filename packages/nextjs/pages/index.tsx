import React from "react";
import Image from "next/image";
import Link from "next/link";
import PosterImage from "../components/assets/poster-image.png";
import type { NextPage } from "next";
import { BellIcon, BugAntIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const ScoreCard = () => {
  return (
    <div className="flex flex-col bg-base-100 px-4 py-4 text-center items-start max-w-md rounded-2xl">
      <div className="flex items-center justify-center">
        <BugAntIcon className="h-8 w-8 fill-secondary" />
        <p className="ml-2 font-semibold">LeetCode December Challenge</p>
      </div>
      <div className="flex items-center justify-between w-full font-bold text-lg">
        <div className="font-bold">40%</div>
        <div className="flex items-center justify-between ">
          <p>🔥9</p>
          <p className="m-4">#13</p>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow w-full px-8">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
          </div>
        </div>

        {/* <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/pages/index.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              RitiProtocol.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div> */}

        <div className="flex-grow w-full px-8 py-12">
          <div className="flex justify-center items-start gap-12 flex-col sm:flex-row">
            {/* card */}
            <div className="flex flex-row bg-base-100 text-center items-center rounded-md p-2 max-w-xl">
              <div className="">
                <Image width={400} height={270} src={PosterImage} alt="join poster" />
              </div>
              <div className="ml-2">
                <div className="hover:bg-secondary hover:rounded-lg text-start py-2 px-3">
                  <p className="font-semibold">Frontend Challenge</p>
                  <p className="font-normal	text-neutral">Re-usable components built using Radix UI and Tailwind CSS</p>
                </div>

                <div className="hover:bg-secondary hover:rounded-lg text-start py-2 px-3">
                  <p className="font-semibold">Frontend Challenge</p>
                  <p className="font-normal	text-neutral">Re-usable components built using Radix UI and Tailwind CSS</p>
                </div>

                <div className="hover:bg-secondary hover:rounded-lg text-start py-2 px-3">
                  <p className="font-semibold">Frontend Challenge</p>
                  <p className="font-normal	text-neutral">Re-usable components built using Radix UI and Tailwind CSS</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-base-100 p-4 text-center items-start max-w-xl rounded-md">
              <h2 className="font-bold text-xl">Your Events</h2>

              <div className="mt-4">
                <div className="flex justify-between">
                  <p className="font-semibold my-1">The Cinnamon Challenge by Groove</p>
                  <div className="flex items-center">
                    <CalendarIcon className="h-6 w-6 fill-secondary" />
                    <div className="ml-3 mr-3">10 Dec</div>
                    | <BellIcon className="ml-2 h-6 w-6 fill-secondary" />
                  </div>
                </div>
                <p className="font-light my-1 text-start">
                  Full | Mid-tempo funk groove with flute, trombone & crazy horn breaks
                </p>
              </div>

              {/* card repeat */}
              <div className="mt-4">
                <div className="flex justify-between">
                  <p className="font-semibold my-1">The Cinnamon Challenge by Groove</p>
                  <div className="flex items-center">
                    <CalendarIcon className="h-6 w-6 fill-secondary" />
                    <div className="ml-3 mr-3">10 Dec</div>
                    | <BellIcon className="ml-2 h-6 w-6 fill-secondary" />
                  </div>
                </div>
                <p className="font-light my-1 text-start">
                  Full | Mid-tempo funk groove with flute, trombone & crazy horn breaks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
