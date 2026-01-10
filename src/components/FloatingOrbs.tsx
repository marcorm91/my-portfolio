type FloatingOrbsProps = {
  className?: string;
};

export function FloatingOrbs({ className = "" }: FloatingOrbsProps) {
  return (
    <div className={`hidden xl:block ${className}`} aria-hidden="true">
      <div className="w-50 h-50 fixed left-16 bottom-32 rounded-full bg-gradient-to-tl from-orange-500 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none" />
      <div className="w-80 h-80 fixed right-16 bottom-32 rounded-full bg-gradient-to-br from-gray-500 to-green-500 opacity-10 animate-floating motion-reduce:animate-none" />
      <div className="w-25 h-25 fixed top-16 left-0 right-128 m-auto rounded-full bg-gradient-to-r from-blue-800 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none" />
    </div>
  );
}
