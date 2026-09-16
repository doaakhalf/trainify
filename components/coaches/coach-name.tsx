/** Isolates Latin coach names (e.g. Nada W.) inside RTL layout. */
export function CoachName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <bdi dir="ltr" className={className}>
      {name}
    </bdi>
  );
}
