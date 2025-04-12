import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { IStyleOptions, IStyleOptionsProps } from "@/types";

export function StyleOptions({ options, onChange }: IStyleOptionsProps) {
  const handleChange = (key: keyof IStyleOptions, value: string | number) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">스타일 옵션</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">예술 스타일</label>
          <Select
            value={options.artStyle}
            onValueChange={(value: string) => handleChange("artStyle", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="디지털아트">디지털아트</SelectItem>
              <SelectItem value="수채화">수채화</SelectItem>
              <SelectItem value="유화">유화</SelectItem>
              <SelectItem value="펜화">펜화</SelectItem>
              <SelectItem value="사실적">사실적</SelectItem>
              <SelectItem value="추상적">추상적</SelectItem>
              <SelectItem value="만화적">만화적</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">색조</label>
          <Select
            value={options.colorTone}
            onValueChange={(value: string) => handleChange("colorTone", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="밝은">밝은</SelectItem>
              <SelectItem value="어두운">어두운</SelectItem>
              <SelectItem value="중간톤">중간톤</SelectItem>
              <SelectItem value="파스텔">파스텔</SelectItem>
              <SelectItem value="흑백">흑백</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          디테일 레벨 (낮음-높음): {options.detailLevel}
        </label>
        <Slider
          value={[options.detailLevel]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value: number[]) =>
            handleChange("detailLevel", value[0])
          }
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">분위기</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="mood"
              value="따뜻한"
              checked={options.mood === "따뜻한"}
              onChange={(e) => handleChange("mood", e.target.value)}
              className="h-4 w-4 text-primary rounded-full"
            />
            <span>따뜻한</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="mood"
              value="차가운"
              checked={options.mood === "차가운"}
              onChange={(e) => handleChange("mood", e.target.value)}
              className="h-4 w-4 text-primary rounded-full"
            />
            <span>차가운</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="mood"
              value="중립적"
              checked={options.mood === "중립적"}
              onChange={(e) => handleChange("mood", e.target.value)}
              className="h-4 w-4 text-primary rounded-full"
            />
            <span>중립적</span>
          </label>
        </div>
      </div>
    </div>
  );
}
