import React, { useState, CSSProperties } from 'react';
import EditableInput from '@/components/react-color-editable-input';
import RGBA from '@/components/react-color-editable-input-rgba';
import {
    validHex,
    HsvaColor,
    hsvaToHex,
    hexToHsva,
    color as handleColor,
    ColorResult,
} from '@uiw/color-convert';
import { useEffect } from 'react';

export interface SketchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'color'> {
    prefixCls?: string;
    width?: number;
    color?: string | HsvaColor;
    editableDisable?: boolean;
    disableAlpha?: boolean;
    onChange?: (newShade: ColorResult) => void;
}

const Sketch = React.forwardRef<HTMLDivElement, SketchProps>((props, ref) => {
    const {
        prefixCls = 'w-color-sketch',
        className,
        onChange,
        width = 218,
        color,
        editableDisable = true,
        disableAlpha = true,
        style,
        ...other
    } = props;
    const [hsva, setHsva] = useState({ h: 209, s: 36, v: 90, a: 1 });
    useEffect(() => {
        if (typeof color === 'string' && validHex(color)) {
            setHsva(hexToHsva(color));
        }
        if (typeof color === 'object') {
            setHsva(color);
        }
    }, [color]);

    const handleChange = (hsv: HsvaColor) => {
        setHsva(hsv);
        onChange && onChange(handleColor(hsv));
    };

    const handleHex = (value: string | number) => {
        if (typeof value === 'string' && validHex(value) && /(3|6)/.test(String(value.length))) {
            handleChange(hexToHsva(value));
        }
    };
    const styleMain = {
        width,
        ...style,
    } as CSSProperties;
    return (
        <div {...other} className={`${prefixCls} ${className || ''}`} ref={ref} style={styleMain}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 10px 3px 10px', gap: '1rem' }}>
                <RGBA
                    hsva={hsva}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    aProps={!disableAlpha ? {} : false}
                    onChange={(result) => handleChange(result.hsva)}
                />
                <EditableInput
                    label="HEX: "
                    value={hsvaToHex(hsva).replace(/^#/, '').toLocaleUpperCase()}
                    onChange={(_, val) => handleHex(val)}
                    style={{ display: 'flex', flexDirection: 'row' }}
                />
            </div>
        </div>
    );
});

Sketch.displayName = 'Sketch';

export default Sketch;
