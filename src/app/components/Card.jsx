export default function Card({title, tools, children}) {
  return (
    <div className="h-full rounded-md flex flex-col">

      <div className="flex items-center justify-between rounded-md rounded-b-none border border-b-0 p-2 gap-2">
        <h5 className='grow mb-0 font-semibold'>{title}</h5>
        <div className='flex items-center justify-between gap-2 font-light'>{tools}</div>
      </div>

      <div className="grow rounded-md rounded-t-none border border-t-0 p-2">
        {children}
      </div>

    </div>
  );
}
