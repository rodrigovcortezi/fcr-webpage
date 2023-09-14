import {imageResolver} from '~/helpers/image'

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
  const resolvedImage = imageResolver(image, {width: 200})
  return (
    <div className="flex flex-col h-full">
      <div className="border-solid border-2 border-[#E5EDF4] p-[40px] mb-[30px] grow">
        <p className="">{text}</p>
      </div>
      <div className="flex pl-[20px]">
        <img
          alt="testimonial"
          src={resolvedImage.url}
          width={resolvedImage.dimensions.width}
          height={resolvedImage.dimensions.height}
          className="w-[60px] h-[60px] rounded-full object-contain"
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
