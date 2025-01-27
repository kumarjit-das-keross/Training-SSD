export default function Widget({title, children}) {
  return (
    <div className="h-full rounded-md flex flex-col items-center justify-between border p-2 gap-2">

      <h5 className='mb-0 font-medium'>{title}</h5>

      <div className='grow font-light'>
        {children}
      </div>

    </div>
  );
}
