import { AdaptiveSlider } from "./adaptive-slider";

function AdaptiveSliderDemo() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <AdaptiveSlider
        min={100}
        max={800}
        step={50}
        defaultValue={300}
        className="h-[400px] w-full max-w-xs sm:max-w-sm sm:p-12"
      />
    </div>
  );
}

export default AdaptiveSliderDemo;
