import { CaretDoubleDown, CaretLeft, CaretRight } from "phosphor-react";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Dot,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ToggleShowHide } from "./ToggleShowHide";

interface CardCarouselProps {
  cards: JSX.Element[] | JSX.Element | undefined;
  cardTitles: string[] | string | undefined;
  fallback?: JSX.Element;
}

export function CardCarousel({
  cards,
  cardTitles,
  fallback = <></>,
}: CardCarouselProps) {
  let slideData;
  let totalSlides;

  if (cards && Array.isArray(cards) && cards.length > 0) {
    slideData = cards.map((courseCard, index) => {
      return (
        <Slide key={index} index={index} innerClassName="flex">
          {courseCard}
        </Slide>
      );
    });
    totalSlides = slideData.length;
  } else {
    slideData = fallback;
    totalSlides = 1;
  }

  return (
    slideData != fallback ? (
    <CarouselProvider
      naturalSlideHeight={300}
      naturalSlideWidth={290}
      totalSlides={totalSlides}
      infinite={true}
      isIntrinsicHeight={true}
    >
      <div className="flex">
        <ButtonBack>
          <CaretLeft className="h-10 w-10" />
        </ButtonBack>
        <Slider className="flex-1 " classNameTray="flex">
          {slideData}
        </Slider>
        <ButtonNext>
          <CaretRight className="h-10 w-10" />
        </ButtonNext>
      </div>
      {
        (cardTitles &&
        Array.isArray(cardTitles) &&
        cardTitles.length > 0) &&
        (
          <div className="flex flex-col items-center gap-4 mt-2">
            <ToggleShowHide
              toggle={
                <span className="flex gap-2 group font-bold">
                  Ver todos
                  <CaretDoubleDown
                    className={`h-4 w-4 self-end transition-all group-hover:animate-bounce lg:-translate-y-1/4`}
                  />
                </span>
              }
            >
              <div className="flex gap-2 flex-wrap">
                { 
                  cardTitles.map((title, index) => {
                    return (
                      <Dot
                        key={index}
                        slide={index}
                        className="bg-gray-500 text-sm font-bold border rounded-full py-1 px-2 disabled:bg-green-500 transition-colors"
                      >
                        {title}
                      </Dot>
                    );
                  })}
              </div>
            </ToggleShowHide>
          </div>
        )
      }     
    </CarouselProvider>
    ) : (
      fallback
    )
  )        
}
