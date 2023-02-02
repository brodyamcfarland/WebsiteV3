import React from "react";
import Image from "next/image";

const ImageCarousel = () => {
    return (
        <div className="mx-auto flex max-w-[20rem] gap-4 overflow-x-auto border border-gray-600/50 bg-gradient-to-t from-white/10 to-transparent px-4 py-4 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/50 md:max-w-[30rem] lg:max-w-[38rem] xl:max-w-[45rem]">
            <Image
                src="/NEXTJS.png"
                width={60}
                height={60}
                alt="NextJS Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/REACT.png"
                width={60}
                height={60}
                alt="React Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/REACTNATIVE.png"
                width={60}
                height={60}
                alt="React Native Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/TS.png"
                width={60}
                height={60}
                alt="Typescript Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/NODE.png"
                width={60}
                height={60}
                alt="Node JS Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/TAILWIND.png"
                width={60}
                height={60}
                alt="Node JS Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/GITLOGO.png"
                width={60}
                height={60}
                alt="GIT Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/POSTGRES.png"
                width={60}
                height={60}
                alt="Postgres Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/FIREBASE.png"
                width={60}
                height={60}
                alt="Firebase Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/SUPABASE.jpg"
                width={60}
                height={60}
                alt="Supabase Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/PRISMA.png"
                width={60}
                height={60}
                alt="Prisma Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/SQLLITELOGO.png"
                width={60}
                height={60}
                alt="SQL Lite Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/ethereum-eth-logo.png"
                width={60}
                height={60}
                alt="ETH Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/SOLIDITY.png"
                width={60}
                height={60}
                alt="Solidity Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/ETHERSJS.png"
                width={60}
                height={60}
                alt="ETHERS.js Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/THIRDWEB.jpeg"
                width={60}
                height={60}
                alt="Thirdweb Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/MORALIS.png"
                width={60}
                height={60}
                alt="Moralis Image"
                className="h-auto w-auto object-contain"
            />
            <Image
                src="/HARDHAT.jpg"
                width={60}
                height={60}
                alt="Hardhat Image"
                className="h-auto w-auto object-contain"
            />
        </div>
    );
};

export default ImageCarousel;
