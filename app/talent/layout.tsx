
export default function TalentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="container flex h-16 items-center">
        </div>
      </div>
      <div className="container flex-1 space-y-8 p-8 pt-6">
        {children}
      </div>
    </div>
  )
}