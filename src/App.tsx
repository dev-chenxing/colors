import { useState } from 'react';
import Sketch from '@/components/react-color-sketch';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

function App() {
  const [hex, setHex] = useState("#fff");
  return (
    <div className="w-full h-dvh flex items-center justify-center p-10" style={{ backgroundColor: hex }}>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>轉換顏色值</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-row items-center gap-4 p-4 pt-0 relative'>
          <Sketch
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;