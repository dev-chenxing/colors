// import * as React from "react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { RxTriangleDown } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


// const colorFormats: string[] = [
//   "RGB",
//   "HSL",
// ]

// const DropdownMenuRadio = () => {
//   // const [open, setOpen] = React.useState(false)
//   const [selectedFormat, setSelectedFormat] = React.useState<string>(
//     colorFormats[0]
//   )

//   return (
//     <div className="flex items-center space-x-4">
//       <p className="text-sm text-muted-foreground w-14">顔色模式</p>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" className="w-32 justify-between">
//             {selectedFormat}
//             <RxTriangleDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-32">
//           <DropdownMenuRadioGroup value={selectedFormat} onValueChange={setSelectedFormat}>
//             <DropdownMenuRadioItem value="RGB">RGB</DropdownMenuRadioItem>
//             <DropdownMenuRadioItem value="HSL">HSL</DropdownMenuRadioItem>
//           </DropdownMenuRadioGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   )
// }

const ColorInputHSL = () => {
  const [H, setH] = useState("0")
  const [S, setS] = useState("0")
  const [L, setL] = useState("0")
  return (
    <div className='gap-4 flex flex-col'>
      <div className="flex items-center">
        <p className="text-sm text-muted-foreground w-20">色調 (H): </p>
        <Input
          type="number"
          className="w-32"
          value={H} onChange={e => setH(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <p className="text-sm text-muted-foreground w-20">飽和度 (S): </p>
        <Input
          type="number"
          className="w-32"
          value={S} onChange={e => setS(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <p className="text-sm text-muted-foreground w-20">亮度 (L): </p>
        <Input
          type="number"
          className="w-32"
          value={L} onChange={e => setL(e.target.value)}
        />
      </div>
    </div>
  )
}

type ColorResult = {
  rgb: RgbColor;
  hsl: HslColor;
  hex: string;
};

type HslColor = {
  h: number;
  s: number;
  l: number;
}

type RslColor = {
  r: number,
  g: number,
  b: number
}

type RgbColor = {
  r: number,
  g: number,
  b: number
}

const rbgToHsl = (rgb: RgbColor): HslColor => {
  let { r, g, b } = rgb
  r = r / 255
  g = g / 255
  b = b / 255
  const
    cMax = Math.max(r, g, b),
    cMin = Math.min(r, g, b),
    delta = cMax - cMin

  let h, s, l
  if (delta === 0) {
    h = 0
  } else if (cMax === r) {
    h = ((g - b) / delta) % 6
  } else if (cMax === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)
  if (h < 0) h += 360

  l = (cMax + cMin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l }
}

const rgbToHex = (rgb: RgbColor): string => {
  const { r, g, b } = rgb
  const toHex = (num: number) => {
    const hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
const ColorInputRGB = () => {
  const [R, setR] = useState("0")
  const [G, setG] = useState("0")
  const [B, setB] = useState("0")
  return (
    <div className='gap-4 flex flex-col'>
      <div className="flex items-center">
        <p className="text-sm text-muted-foreground w-20">紅色 (R): </p>
        <Input
          type="number"
          className="w-32"
          value={R} onChange={e => {
            console.log(R, e.target.value)
            setR(e.target.value)
            setColor(rgb2Hex(e.target.value, G, B))
          }}
        />
      </div>
      <div className="flex items-center">
        <p className="text-sm text-muted-foreground w-20">綠色 (G): </p>
        <Input
          type="number"
          className="w-32"
          value={G} onChange={e => setG(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <p className="text-sm text-muted-foreground w-20">藍色 (B): </p>
        <Input
          type="number"
          className="w-32"
          value={B} onChange={e => setB(e.target.value)}
        />
      </div>
    </div>
  )
}
const ColorInputHex = () => {
  return (
    <div className="flex items-center">
      <p className="text-sm text-muted-foreground w-20">HEX: </p>
      <Input
        className='w-32'
        value={color}
        onChange={e => setColor(e.target.value)}
      />
    </div>
  )
}

const Color = ({ rgb, onChange }: { rgb: RgbColor, onChange: Function }) => {
  const hex = rgbToHex(rgb)
  return (
    <>
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="RGB" className="flex flex-col gap-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="RGB">RGB</TabsTrigger>
            <TabsTrigger value="HSL">HSL</TabsTrigger>
          </TabsList>
          <TabsContent value="RGB">
            <ColorInputRGB />
          </TabsContent>
          <TabsContent value="HSL">
            <ColorInputHSL />
          </TabsContent>
        </Tabs>
        <ColorInputHex />
      </div>
      <div className={`absolute bottom-4 right-4 w-24 h-24 rounded-lg bg-[${hex}]`}></div>
    </>
  )
}
function App() {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 })
  const handleColorChange = (data: ColorResult) => {
    setRgb(data.rgb)
  }
  const hsl = rbgToHsl(rgb)
  const hex = rgbToHex(rgb)
  return (
    <>
      <div className="w-full h-dvh flex items-center justify-center p-10">
        <Card className="w-[352px]">
          <CardHeader>
            <CardTitle>轉換顏色值</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row items-center gap-4 p-4 pt-0 relative'>
            <Color color={rgb} onChange={handleColorChange} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default App
