import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidde grid">
      <div className="place-content-center place-self-center text-center">
        <Image
          src="Cine_Logo.svg"
          alt="Logo de Cine"
          width={150}
          className="place-self-center bottom-10 relative top-10"
          height={0} />
        {children}
      </div>
    </div>
  )
}
