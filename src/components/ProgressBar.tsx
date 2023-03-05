type ProgressBarProps = { percent: number }

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="overflow-hidden rounded-full bg-[#fffffd] w-full">
      <div
        className="h-2 rounded-full bg-[#95aefd]"
        style={{
          width: percent + '%'
        }}></div>
    </div>
  )
}
