import { LinearLoop } from "@/components/linearLoop";
import { ImageSwiper } from "@/components/photoCarousel";

export default function Home() {
  return (
    <main className="h-[100dvh] p-6 flex flex-col justify-center gap-4">
      <LinearLoop
        speed={200}
        direction="left"
        pauseOnHover={false}
        className="w-full shrink-0 p-0 m-0">
        <h1 className="font-header font-extrabold text-primary tracking-tighter leading-none text-[25vh] whitespace-nowrap uppercase">
          Welcome to my point of view •
        </h1>
      </LinearLoop>
      <div className="grid grid-cols-4 grid-rows-6 gap-4 flex-1">
        <p className="col-start-2 col-span-1 row-start-4 2xl:row-start-5 row-span-2 font-header">
          Through the lens, I try to slow time—holding the breath between what
          is seen and what is felt. Each frame is a small confession, a way to
          show you how the world sounds inside my chest. If you&apos;re willing,
          come closer. Look longer. There&apos;s more here than light and
          shadow.
        </p>
        <div className="col-start-3 col-span-2 row-start-1 row-span-6 relative">
          <ImageSwiper
            showTitle={false}
            cards={[
              {
                id: 1,
                imageUrl: "https://gonzaloariza-975314016.imgix.net/Portfolio-20.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
              {
                id: 2,
                imageUrl: "https://gonzaloariza-975314016.imgix.net/Portfolio-36.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
              
              {
                id: 3,
                imageUrl: "https://gonzaloariza-975314016.imgix.net/Portfolio-61.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
              {
                id: 4,
                imageUrl: "https://gonzaloariza-975314016.imgix.net/Portfolio-24.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
              {
                id: 5,
                imageUrl: "https://gonzaloariza-975314016.imgix.net/Portfolio-15.jpg",
                title: "Portfolio photograph showing artistic composition",
              },
            ]}
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
