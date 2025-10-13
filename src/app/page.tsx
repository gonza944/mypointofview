"use client";

import { LinearLoop } from "@/components/linearLoop";
import { ImageSwiper } from "@/components/photoCarousel";
import { MagneticMouse } from "@/components/MagneticMouse";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const shouldRenderText = useMediaQuery("(min-width: 768px)");

  return (
    <MagneticMouse>
      <main className="h-[100dvh] md:p-6 flex flex-col justify-center gap-4">
      <div className="magnetic-element">
        <LinearLoop
          speed={200}
          direction="left"
          pauseOnHover={false}
          className="w-full shrink-0 p-0 m-0">
          <h1 className="font-header font-extrabold text-primary tracking-tighter leading-none text-[10vh] md:text-[15vh] lg:text-[25vh] whitespace-nowrap uppercase">
            Welcome to my point of view •
          </h1>
        </LinearLoop>
      </div>
      <div className="flex flex-col gap-4 flex-1 lg:grid lg:grid-cols-4 lg:grid-rows-6">
        <div className="magnetic-element relative flex-1 lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-6">
          <ImageSwiper
            showTitle={false}
            cards={[
              {
                id: 1,
                imageUrl:
                  "https://gonzaloariza-975314016.imgix.net/Portfolio-20.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
              {
                id: 2,
                imageUrl:
                  "https://gonzaloariza-975314016.imgix.net/Portfolio-36.jpg",
                title: "Portfolio photograph showing artistic composition",
              },

              {
                id: 3,
                imageUrl:
                  "https://gonzaloariza-975314016.imgix.net/Portfolio-61.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
              {
                id: 4,
                imageUrl:
                  "https://gonzaloariza-975314016.imgix.net/Portfolio-24.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
              {
                id: 5,
                imageUrl:
                  "https://gonzaloariza-975314016.imgix.net/Portfolio-15.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
            ]}
            className="w-full h-full"
          />
        </div>
        {shouldRenderText && (
          <p className="magnetic-element font-header lg:col-start-2 lg:col-span-1 lg:row-start-4 2xl:lg:row-start-5 lg:row-span-2 p-6 md:p-0 text-justify">
            Through the lens, I try to slow time—holding the breath between what
            is seen and what is felt. Each frame is a small confession, a way to
            show you how the world sounds inside my chest. If you&apos;re
            willing, come closer. Look longer. There&apos;s more here than light
            and shadow.
          </p>
        )}
      </div>
    </main>
    </MagneticMouse>
  );
}
