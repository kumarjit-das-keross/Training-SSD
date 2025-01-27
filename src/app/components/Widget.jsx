export default function Widget({title, children}) {
  return (
    <div className="h-full rounded-md flex flex-col items-center justify-center gap-2 border p-2">
      <h5 className='mb-0 font-medium'>{title}</h5>
      <div className='font-light text-sm'>{children}</div>
    </div>
  );
}
