function OffCanvas({ children, isExpanded }: { children: any; isExpanded: boolean }) {
  return (
    <div className="navbar__off-canvas" aria-expanded={isExpanded}>
      {children}
    </div>
  );
}

export default OffCanvas;
