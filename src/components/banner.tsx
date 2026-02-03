export function Banner() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 p-4 select-none">
      <div className="relative">
        {" "}
        <div 
          className="absolute inset-0 blur-2xl" 
          style={{ background: 'radial-gradient(circle, rgba(173, 216, 230, 0.5), transparent)' }}
        ></div> 
        <img
          src={"/pokedex.svg"}
          alt="pokedex"
          className="h-30 sm:h-40 2xl:h-48 relative z-10"
        />
      </div>
    </div>
  );
}
