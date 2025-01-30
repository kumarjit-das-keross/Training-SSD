export default function InfoWidget({title, value, info = {type: 'neutral', text: ''}}) {
  return (
    <div className="h-full rounded-md flex flex-col items-center justify-center gap-1 border p-2">
      <h5 className="mb-0 font-bold text-md">{title}</h5>
      <div className="font-medium text-2xl">{value}</div>
      <div className={
        'font-light text-xs' +
        (info.type === 'positive' ? ' text-green-500' : '') +
        (info.type === 'negative' ? ' text-red-500' : '')
      }>{info.text}</div>
    </div>
  );
}
