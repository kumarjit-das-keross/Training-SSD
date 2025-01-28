import {LoaderCircle} from 'lucide-react';

export default function Spinner({border}) {
  const showBorder = !!border;
  const {color, rounded, width, extra} = border || {};

  return (
    <div className={
      'w-full h-full flex items-center justify-center' +
      (showBorder ? (
        ' border' +
        `${rounded ? ` rounded-${rounded}` : ''}` +
        `${width ? ` border-${width}` : ''}` +
        `${color ? ` border-${color}` : ''}` +
        `${extra ? ` ${extra}` : ''}`
      ) : '')
    }>
      <LoaderCircle size={16} strokeWidth={1} className="animate-spin"/>
    </div>
  );
}
