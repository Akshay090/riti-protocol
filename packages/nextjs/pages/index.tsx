import { useEffect } from "react";
import * as React from "react";
import Image from "next/image";
import PosterImage from "../components/assets/poster-image.png";
import type { NextPage } from "next";
import "wagmi";
import { useAccount } from "wagmi";
import { BellIcon, BugAntIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const ScoreCard = ({ name, ritiId }: { name: string; ritiId: bigint }) => {
  const { address } = useAccount();

  const scoreResp = useScaffoldContractRead({
    contractName: "RitiProtocol",
    functionName: "getScoresForRiti",
    args: [ritiId],
  });

  const sortedbyScore = Array.from(scoreResp.data || []).sort((a, b) => {
    return Number(b.score) - Number(a.score);
  });

  // position in array becomes rank, by addresss,  find by address
  const rankByAddress = sortedbyScore.findIndex(score => {
    return score.userAddress === address;
  });
  console.log("rankByAddress", rankByAddress, " sortedbyScore", sortedbyScore, name);

  return (
    <div
      style={{
        minWidth: "300px",
      }}
      className="flex flex-col bg-base-100 px-4 py-4 text-center items-start max-w-md rounded-2xl"
    >
      <div className="flex items-center justify-center">
        <BugAntIcon className="h-8 w-8 fill-secondary" />
        <p className="ml-2 font-semibold">{name}</p>
      </div>
      <div className="flex items-center justify-between w-full font-bold text-lg">
        <div className="font-bold">40%</div>
        <div className="flex items-center justify-between ">
          <p>🔥9</p>
          <p className="m-4">#{rankByAddress + 1}</p>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const { address } = useAccount();

  const getUserRitisResp = useScaffoldContractRead({
    contractName: "RitiProtocol",
    functionName: "getUserRitis",
    args: [address],
  });

  console.log("getUserRitisResp", getUserRitisResp.data);

  const getAllRitisResp = useScaffoldContractRead({
    contractName: "RitiProtocol",
    functionName: "getAllRitis",
  });

  // const signer = useEthersSigner();

  // console.log(signer);

  // useEffect(() => {
  //   // if (!signer) return;
  //   // async function connect() {
  //   //   // const user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

  //   //   // // channel creation
  //   //   // // const response = await user.channel.create({
  //   //   // //   name: "Riti Protocol Beta 1 Channel",
  //   //   // //   description: "Test Description",
  //   //   // //   icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC",
  //   //   // //   url: "https://push.org",
  //   //   // // });

  //   //   // // send notif to channel
  //   //   // console.log("user", await user.channel.info());
  //   // }
  //   // connect();
  // }, [signer]);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow w-full px-8">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <h2 className="font-bold text-xl">Your Ritis</h2>
            {getUserRitisResp.data?.map(riti => {
              return <ScoreCard name={riti.config.platformConfig.platformName} ritiId={riti.id} />;
            })}
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
              <div
                className="ml-2"
                style={{
                  maxHeight: "380px",
                  overflowY: "scroll",
                }}
              >
                <div className="hover:bg-secondary hover:rounded-lg text-start py-2 px-3">
                  <p className="font-semibold">Frontend Challenge</p>
                  <p className="font-normal	text-neutral">Re-usable components built using Radix UI and Tailwind CSS</p>
                </div>

                {getAllRitisResp.data?.map(riti => {
                  return (
                    <div className="hover:bg-secondary hover:rounded-lg text-start py-2 px-3">
                      <p className="font-semibold">{riti.config.platformConfig.platformName}</p>
                      <p className="font-normal	text-neutral">
                        Re-usable components built using Radix UI and Tailwind CSS
                      </p>
                    </div>
                  );
                })}

                {/* <div className="hover:bg-secondary hover:rounded-lg text-start py-2 px-3">
                  <p className="font-semibold">Frontend Challenge</p>
                  <p className="font-normal	text-neutral">Re-usable components built using Radix UI and Tailwind CSS</p>
                </div>

                <div className="hover:bg-secondary hover:rounded-lg text-start py-2 px-3">
                  <p className="font-semibold">Frontend Challenge</p>
                  <p className="font-normal	text-neutral">Re-usable components built using Radix UI and Tailwind CSS</p>
                </div> */}
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
