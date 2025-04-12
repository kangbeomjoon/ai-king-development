import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    </div>
  );
}
