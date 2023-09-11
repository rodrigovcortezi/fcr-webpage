type TestimonialCardProps = {
  name: string
  image: string
  profession: string
  text: string
}

const TestimonialCard = ({
  name,
  image,
  profession,
  text,
}: TestimonialCardProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-solid border-2 border-[#E5EDF4] p-[40px] mb-[30px] grow">
        <p className="">{text}</p>
      </div>
      <div className="flex pl-[20px]">
        <img
          alt="testimonial"
          src={image}
          width={858}
          height={800}
          className="w-[60px] h-auto rounded-full"
        />
        <div className="pl-[20px]">
          <h3 className="text-black text-[16px] font-semibold leading-none mt-[6px] mb-[3px]">
            {name}
          </h3>
          <span className="text-[14px]">{profession}</span>
        </div>
      </div>
    </div>
  )
}

export {TestimonialCard}
