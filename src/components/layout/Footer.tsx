export const Footer = () => {
  return (
    <div className="h-16 flex-col-center border-t-1 border-solid border-border">
      <div className="container mx-auto flex justify-between items-center text-3.25">
        <span>Comex ©{new Date().getFullYear()}.</span>
        <span>Support us by delegating stake to the comex validator</span>
      </div>
    </div>
  )
}
